const express = require("express");
const { google } = require("googleapis");
const NodeCache = require("node-cache");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
require("dotenv").config(); // Loads environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use CORS middleware (allowing all origins)
app.use(cors({ origin: "*" }));

// Google Sheets configuration
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Initialize NodeCache with a TTL of 5 hours (5 * 60 * 60 seconds)
const cache = new NodeCache({ stdTTL: 5 * 60 * 60 });

// Helper function to create Google Sheets API client
async function getGoogleSheetsClient() {
  try {
    // Check if we have a service account key file
    const hasServiceAccount = fs.existsSync(path.join(__dirname, 'service-account.json'));
    
    if (hasServiceAccount) {
      // Use service account auth for read/write operations
      const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'service-account.json'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      
      const client = await auth.getClient();
      return google.sheets({ version: 'v4', auth: client });
    } else {
      // Fallback to API key for read-only operations
      const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
      if (!GOOGLE_API_KEY) {
        console.error("No service account file found and no API key provided!");
        throw new Error("Authentication configuration missing");
      }
      return google.sheets({ version: "v4", auth: GOOGLE_API_KEY });
    }
  } catch (err) {
    console.error("Error creating Google Sheets client:", err);
    throw err;
  }
}

// Generate a unique 6-digit access code
function generateAccessCode(teamName, email) {
  // Create a deterministic but secure hash based on team name, email and current timestamp
  const timestamp = new Date().getTime().toString();
  const dataToHash = teamName + email + timestamp;
  const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
  
  // Convert the first 8 characters of the hash to a number and ensure it's 6 digits
  const hexSubstring = hash.substring(0, 8);
  const numericValue = parseInt(hexSubstring, 16);
  
  // Ensure it's exactly 6 digits by taking modulo and adding offset if needed
  let sixDigitCode = (numericValue % 900000 + 100000).toString();
  
  return sixDigitCode;
}

// Root endpoint for a basic check
app.get("/", (req, res) => {
  res.send("Leaderboard API");
});

// Helper function to compute and format the top 10 rows sorted by points as objects
// Assumes the first row is a header, names in first column and points in second column
function computeTop10(rows) {
  if (rows.length < 2) return [];
  // Exclude header row and sort based on points in descending order
  const dataRows = rows.slice(1);
  const sortedRows = dataRows.sort((a, b) => {
    const aPoints = parseFloat(a[1]) || 0;
    const bPoints = parseFloat(b[1]) || 0;
    return bPoints - aPoints;
  });
  // Get the top 10 rows
  const top10Rows = sortedRows.slice(0, 10);
  // Map each row to an object with "name" and "points" properties
  return top10Rows.map((row) => ({
    name: row[0],
    points: parseFloat(row[1]) || 0,
  }));
}

// Route to fetch a specific sheet by event name and return formatted top 10
app.get("/sheet/:eventname", async (req, res) => {
  const eventName = req.params.eventname;

  // Check if this event's data is cached
  const cachedData = cache.get(eventName);

  try {
    // Create a Sheets API client
    const sheetsApi = await getGoogleSheetsClient();

    // Fetch data from the sheet where the tab name matches the event name.
    const response = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: eventName,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ error: `No data found for event sheet: ${eventName}` });
    }

    // Compute the top 10 records as an array of objects
    const top10 = computeTop10(rows);

    // Cache both the raw data and the computed top 10
    cache.set(eventName, { fullData: rows, top10 });

    // Return a JSON response with both full data and the formatted top 10 data
    return res.json({
      source: "google-sheets",
      event: eventName,
      data: rows,
      top10: top10,
    });
  } catch (error) {
    console.error("Error fetching sheet:", error);
    return res.status(500).json({
      error: "Failed to fetch sheet data",
      details: error.message,
    });
  }
});

// Add registration endpoint
app.post("/api/register", async (req, res) => {
  const { name, teamName, email, phone, college, members } = req.body;
  
  console.log("Received registration with members:", members);
  
  if (!name || !teamName || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  try {
    // Create a Sheets API client
    const sheetsApi = await getGoogleSheetsClient();
    
    // Check if team already exists
    const response = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "duality",
    });
    
    const rows = response.data.values || [];
    
    // Check if headers exist, and add them if not
    if (rows.length === 0) {
      // Add headers to duality sheet
      const dualityHeaders = [
        "Team Name", 
        "Points", 
        "Leader Name", 
        "Email", 
        "Phone", 
        "College", 
        "Access Code", 
        "Member1", 
        "Member2", 
        "Member3", 
        "Member4"
      ];
      
      await sheetsApi.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "duality",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [dualityHeaders]
        }
      });
      
      console.log("Added headers to duality sheet");
    }
    
    // Check if team name already exists (skip the header row if it exists)
    const startIdx = rows.length > 0 ? 1 : 0;
    const existingTeam = rows.slice(startIdx).find(row => row[0] === teamName);
    
    if (existingTeam) {
      return res.status(409).json({ error: "Team name already exists" });
    }
    
    // Check and add headers to registrations sheet if needed
    const registrationsResponse = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "registrations",
    });
    
    const registrationsRows = registrationsResponse.data.values || [];
    
    if (registrationsRows.length === 0) {
      // Add headers to registrations sheet
      const registrationsHeaders = [
        "Team Name", 
        "Leader Name", 
        "Email", 
        "Phone", 
        "College", 
        "Timestamp", 
        "Access Code", 
        "Member1", 
        "Member2", 
        "Member3", 
        "Member4"
      ];
      
      await sheetsApi.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "registrations",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [registrationsHeaders]
        }
      });
      
      console.log("Added headers to registrations sheet");
    }
    
    // Check and add headers to progress sheet if needed
    const progressResponse = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "progress",
    });
    
    const progressRows = progressResponse.data.values || [];
    
    if (progressRows.length === 0) {
      // Add headers to progress sheet
      const progressHeaders = [
        "Team Name", 
        "Progress", 
        "Last Updated"
      ];
      
      await sheetsApi.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "progress",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [progressHeaders]
        }
      });
      
      console.log("Added headers to progress sheet");
    }
    
    // Generate a unique deterministic 6-digit access code based on team info
    const accessCode = generateAccessCode(teamName, email);
    
    // Process member names
    const memberArray = members ? members.split(',').map(member => member.trim()).filter(m => m) : [];
    console.log("Processed member array:", memberArray);
    
    // Add team to duality sheet
    // Create a single row with team info and each member in a separate cell
    const dualityRow = [
      teamName,           // Column 1: Team name
      0,                  // Column 2: Initial score
      name,               // Column 3: Captain name
      email,              // Column 4: Email
      phone || "N/A",     // Column 5: Phone
      college || "N/A",   // Column 6: College
      accessCode,         // Column 7: Access code
      ...memberArray      // Column 8+ : Each member in their own cell
    ];
    
    console.log("Duality row being saved:", dualityRow);
    
    await sheetsApi.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "duality",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [dualityRow]
      }
    });
    
    // Add team to registrations sheet
    // Create a single row with team info and each member in a separate cell
    const registrationRow = [
      teamName,                // Column 1: Team name 
      name,                    // Column 2: Captain name
      email,                   // Column 3: Email
      phone || "N/A",          // Column 4: Phone
      college || "N/A",        // Column 5: College
      new Date().toISOString(),// Column 6: Timestamp
      accessCode,              // Column 7: Access code
      ...memberArray           // Column 8+ : Each member in their own cell
    ];
    
    console.log("Registration row being saved:", registrationRow);
    
    await sheetsApi.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "registrations",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [registrationRow]
      }
    });
    
    // Clear cache
    cache.del("duality");
    cache.del("registrations");
    
    return res.status(201).json({ 
      message: "Team registered successfully", 
      teamName,
      accessCode
    });
  } catch (error) {
    console.error("Error registering team:", error);
    return res.status(500).json({
      error: "Failed to register team",
      details: error.message,
    });
  }
});

// Add endpoint to verify team access code
app.post("/api/verify-team", async (req, res) => {
  const { teamName, accessCode } = req.body;
  
  if (!teamName || !accessCode) {
    return res.status(400).json({ error: "Team name and access code are required" });
  }
  
  try {
    // Create a Sheets API client
    const sheetsApi = await getGoogleSheetsClient();
    
    // Look for the team in the duality sheet
    const response = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "duality",
    });
    
    const rows = response.data.values || [];
    
    // Skip header row if it exists
    const startIdx = rows.length > 0 ? 1 : 0;
    
    // Find the team by name and check if access code matches
    const team = rows.slice(startIdx).find(row => row[0] === teamName);
    
    if (!team) {
      return res.status(404).json({ error: "Team not found", verified: false });
    }
    
    const storedAccessCode = team[6]; // Access code is stored in column 7 (index 6)
    
    if (storedAccessCode !== accessCode) {
      return res.status(401).json({ error: "Invalid access code", verified: false });
    }
    
    return res.status(200).json({ verified: true });
  } catch (error) {
    console.error("Error verifying team:", error);
    return res.status(500).json({
      error: "Failed to verify team",
      details: error.message,
    });
  }
});

// Get team progress endpoint
app.get("/api/team-progress", async (req, res) => {
  const { teamName } = req.query;
  
  if (!teamName) {
    return res.status(400).json({ error: "Team name is required" });
  }
  
  try {
    // Create a Sheets API client
    const sheetsApi = await getGoogleSheetsClient();
    
    // Get team progress from the progress sheet
    const response = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "progress",
    });
    
    const rows = response.data.values || [];
    
    // Skip header row if it exists
    const startIdx = rows.length > 0 ? 1 : 0;
    
    // Find the team's progress record
    const progressRow = rows.slice(startIdx).find(row => row[0] === teamName);
    
    if (!progressRow) {
      // If no progress record exists, return 0
      return res.json({ progress: 0 });
    }
    
    // Return the current progress value
    return res.json({ 
      progress: parseInt(progressRow[1]) || 0,
      timestamp: progressRow[2] || null
    });
  } catch (error) {
    console.error("Error fetching team progress:", error);
    return res.status(500).json({
      error: "Failed to fetch team progress",
      details: error.message,
    });
  }
});

// Update team progress endpoint
app.post("/api/update-progress", async (req, res) => {
  const { teamName, progress } = req.body;
  
  if (!teamName || progress === undefined) {
    return res.status(400).json({ error: "Team name and progress are required" });
  }
  
  try {
    // Create a Sheets API client
    const sheetsApi = await getGoogleSheetsClient();
    
    // Get current progress data
    const progressResponse = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "progress",
    });
    
    const progressRows = progressResponse.data.values || [];
    
    // Check if headers exist, and add them if not
    if (progressRows.length === 0) {
      // Add headers to progress sheet
      const progressHeaders = [
        "Team Name", 
        "Progress", 
        "Last Updated"
      ];
      
      await sheetsApi.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "progress",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [progressHeaders]
        }
      });
    }
    
    // Skip header row if it exists
    const progressStartIdx = progressRows.length > 0 ? 1 : 0;
    const progressRowIndex = progressRows.slice(progressStartIdx).findIndex(row => row[0] === teamName);
    
    const timestamp = new Date().toISOString();
    
    if (progressRowIndex === -1) {
      // If team doesn't exist in progress sheet, append new row
      await sheetsApi.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "progress",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[teamName, progress.toString(), timestamp]]
        }
      });
    } else {
      // Update existing row
      const actualProgressIndex = progressStartIdx + progressRowIndex + 1;
      const progressRangeToUpdate = `progress!B${actualProgressIndex}:C${actualProgressIndex}`;
      
      await sheetsApi.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: progressRangeToUpdate,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[progress.toString(), timestamp]]
        }
      });
    }
    
    return res.status(200).json({ 
      message: "Progress updated successfully",
      teamName,
      progress
    });
  } catch (error) {
    console.error("Error updating team progress:", error);
    return res.status(500).json({
      error: "Failed to update team progress",
      details: error.message,
    });
  }
});

// Check answer endpoint
app.post("/api/check-answer", async (req, res) => {
  const { teamName, clueIndex, answer, accessCode } = req.body;
  
  if (!teamName || clueIndex === undefined || !answer) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  try {
    // Create a Sheets API client
    const sheetsApi = await getGoogleSheetsClient();
    
    // First verify the team and access code if provided
    if (accessCode) {
      const teamResponse = await sheetsApi.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "duality",
      });
      
      const teamRows = teamResponse.data.values || [];
      
      // Skip header row if it exists
      const startIdx = teamRows.length > 0 ? 1 : 0;
      
      const team = teamRows.slice(startIdx).find(row => row[0] === teamName);
      
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
      
      const storedAccessCode = team[6]; // Access code is stored in column 7 (index 6)
      
      if (storedAccessCode !== accessCode) {
        return res.status(401).json({ error: "Invalid access code" });
      }
    }
    
    // Check the answers in the answers sheet
    const answersResponse = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "answers",
    });
    
    const answerRows = answersResponse.data.values || [];
    
    // Assuming answers sheet has format [clueIndex, correctAnswer, hint]
    const clueAnswer = answerRows.find(row => parseInt(row[0]) === parseInt(clueIndex));
    
    if (!clueAnswer) {
      return res.status(404).json({ error: "Clue not found" });
    }
    
    const correctAnswer = clueAnswer[1].toLowerCase();
    const hint = clueAnswer[2] || "Try again!";
    
    const isCorrect = answer.toLowerCase().trim() === correctAnswer;
    
    // Optionally log the answer attempt
    await sheetsApi.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "answer_log",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[
          teamName, 
          clueIndex.toString(), 
          answer, 
          isCorrect ? "Correct" : "Incorrect",
          new Date().toISOString()
        ]]
      }
    });
    
    if (isCorrect) {
      return res.json({
        isCorrect: true,
        message: "Correct! Moving to next clue..."
      });
    } else {
      return res.json({ 
        isCorrect: false,
        message: hint
      });
    }
  } catch (error) {
    console.error("Error checking answer:", error);
    return res.status(500).json({
      error: "Failed to check answer",
      details: error.message,
    });
  }
});

// Delete team endpoint
app.post("/api/delete-team", async (req, res) => {
  const { teamName, accessCode } = req.body;
  
  if (!teamName || !accessCode) {
    return res.status(400).json({ error: "Team name and access code are required" });
  }
  
  try {
    // Create a Sheets API client
    const sheetsApi = await getGoogleSheetsClient();
    
    // First verify the team and access code
    const teamResponse = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "duality",
    });
    
    const teamRows = teamResponse.data.values || [];
    const teamIndex = teamRows.findIndex(row => row[0] === teamName);
    
    if (teamIndex === -1) {
      return res.status(404).json({ error: "Team not found" });
    }
    
    const storedAccessCode = teamRows[teamIndex][6]; // Access code is in column 7 (index 6)
    
    if (storedAccessCode !== accessCode) {
      return res.status(401).json({ error: "Invalid access code" });
    }
    
    // Get spreadsheet info to find sheet IDs
    const spreadsheet = await sheetsApi.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID
    });
    
    // Find the sheets we want to update
    const dualitySheet = spreadsheet.data.sheets.find(sheet => 
      sheet.properties.title === "duality");
      
    const progressSheet = spreadsheet.data.sheets.find(sheet => 
      sheet.properties.title === "progress");
    
    const registrationsSheet = spreadsheet.data.sheets.find(sheet => 
      sheet.properties.title === "registrations");
    
    // Delete team from duality sheet
    if (dualitySheet) {
      // Add a new row at index with 'DELETED' marker
      const dualityRange = `duality!A${teamIndex + 1}:A${teamIndex + 1}`;
      
      await sheetsApi.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: dualityRange,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [["DELETED_" + teamName]]
        }
      });
    }
    
    // Delete progress data
    if (progressSheet) {
      const progressResponse = await sheetsApi.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "progress",
      });
      
      const progressRows = progressResponse.data.values || [];
      const progressRowIndex = progressRows.findIndex(row => row[0] === teamName);
      
      if (progressRowIndex !== -1) {
        const progressRange = `progress!A${progressRowIndex + 1}:A${progressRowIndex + 1}`;
    
    await sheetsApi.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
          range: progressRange,
      valueInputOption: "USER_ENTERED",
      resource: {
            values: [["DELETED_" + teamName]]
          }
        });
      }
    }
    
    // Delete from registrations sheet
    if (registrationsSheet) {
      const registrationsResponse = await sheetsApi.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "registrations",
      });
      
      const regRows = registrationsResponse.data.values || [];
      const regRowIndex = regRows.findIndex(row => row[0] === teamName);
      
      if (regRowIndex !== -1) {
        const regRange = `registrations!A${regRowIndex + 1}:A${regRowIndex + 1}`;
        
        await sheetsApi.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: regRange,
          valueInputOption: "USER_ENTERED",
          resource: {
            values: [["DELETED_" + teamName]]
          }
        });
      }
    }
    
    // Clear cache for these sheets
    cache.del("duality");
    cache.del("progress");
    cache.del("registrations");
    
    return res.status(200).json({ 
      message: "Team data has been deleted"
    });
  } catch (error) {
    console.error("Error deleting team:", error);
    return res.status(500).json({
      error: "Failed to delete team",
      details: error.message,
    });
  }
});

// Admin endpoint to update team score directly in the duality sheet
app.post("/api/admin-update-score", async (req, res) => {
  const { teamName, newScore, adminPassword } = req.body;
  
  if (!teamName || newScore === undefined) {
    return res.status(400).json({ error: "Team name and score are required" });
  }
  
  // Verify admin password (this is a simple check, in production use proper auth)
  if (!adminPassword || adminPassword !== "admin123") {
    return res.status(401).json({ error: "Unauthorized: Admin access required" });
  }
  
  try {
    // Create a Sheets API client
    const sheetsApi = await getGoogleSheetsClient();
    
    // Find the team in the duality sheet
    const teamResponse = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "duality",
    });
    
    const teamRows = teamResponse.data.values || [];
    
    // Find the team row index (accounting for header row)
    const teamRowIndex = teamRows.findIndex(row => row[0] === teamName);
    
    if (teamRowIndex === -1) {
      return res.status(404).json({ error: "Team not found" });
    }
    
    if (teamRowIndex === 0) {
      return res.status(400).json({ error: "Cannot update header row" });
    }
    
    // Update the points (column B, which is index 1) in the duality sheet
    // Row number in sheets is 1-indexed, so add 1 to the array index
    const actualRowIndex = teamRowIndex + 1;
    const dualityRangeToUpdate = `duality!B${actualRowIndex}`;
    
    await sheetsApi.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: dualityRangeToUpdate,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[newScore.toString()]]
      }
    });
    
    // Also update the progress sheet to keep both in sync
    const progressResponse = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "progress",
    });
    
    const progressRows = progressResponse.data.values || [];
    const timestamp = new Date().toISOString();
    
    // Skip header row if it exists
    const progressStartIdx = progressRows.length > 0 ? 1 : 0;
    const progressRowIndex = progressRows.slice(progressStartIdx).findIndex(row => row[0] === teamName);
    
    if (progressRowIndex === -1) {
      // If team doesn't exist in progress sheet, append new row
      await sheetsApi.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "progress",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[teamName, newScore.toString(), timestamp]]
        }
      });
    } else {
      // Update existing row
      const actualProgressIndex = progressStartIdx + progressRowIndex + 1;
      const progressRangeToUpdate = `progress!B${actualProgressIndex}:C${actualProgressIndex}`;
      
      await sheetsApi.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: progressRangeToUpdate,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[newScore.toString(), timestamp]]
        }
      });
    }
    
    // Clear cache for both sheets
    cache.del("duality");
    cache.del("progress");
    
    return res.status(200).json({ 
      message: "Team score updated successfully",
      teamName,
      newScore
    });
  } catch (error) {
    console.error("Error updating team score:", error);
    return res.status(500).json({
      error: "Failed to update team score",
      details: error.message,
    });
  }
});

// Start the Express server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}`);
  });
}

module.exports = app; 