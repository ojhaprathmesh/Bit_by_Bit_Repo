# Duality Event - Treasure Hunt Challenge

A web application for a treasure hunt challenge where teams can register, solve clues, and compete on a leaderboard. The application uses Google Sheets as the backend database.

## Features

- Team registration with unique 6-digit access codes
- Secure team authentication for clue access
- Interactive clue solving interface
- Real-time leaderboard with Google Sheets integration
- Admin panel for score management

## Setup and Run

### Prerequisites

- Node.js (v14 or higher)
- Google Cloud Platform account for Google Sheets API

### Google Sheets Setup

1. Create a new Google Sheet with the following tabs:
   - `duality` - For the leaderboard (columns: Team Name, Score, Name, Email, Phone, College, Members, Access Code)
   - `registrations` - For registration data (columns: Team Name, Name, Email, Phone, College, Members, Timestamp, Access Code)
   - `answers` - For tracking answer submissions (columns: Team Name, Clue Index, Answer, Result, Timestamp)

2. Get your Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```

3. Set up Google Service Account (required for write operations):
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (or select an existing one)
   - Enable the Google Sheets API for your project
   - Go to "Credentials" and click "Create Credentials" > "Service Account"
   - Fill in the service account details and grant it a role (Project > Editor is sufficient)
   - Once created, go to the service account, click on "Keys" tab
   - Click "Add Key" > "Create new key" and select JSON format
   - Download the key file and save it as `service-account.json` in the server directory

4. Share your Google Sheet with the service account email (it looks like `something@project-id.iam.gserviceaccount.com`) and give it Editor access.

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/HackBMU_7.0_Repo.git
cd HackBMU_7.0_Repo
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
cd ..
```

4. Configure the backend
   - Update the `.env` file in the server directory:
   ```
   SPREADSHEET_ID=your_spreadsheet_id_here
   ```
   - Place your downloaded service account JSON file in the server directory
   - Rename it to `service-account.json`

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```

This will start the server at http://localhost:3000

2. In a new terminal, start the frontend
```bash
npm run dev
```

The application will be available at http://localhost:5173

## Using the Application

1. **Registration**: 
   - Go to the "Register" tab to create a new team
   - Fill out the registration form with team details
   - Upon successful registration, you'll receive a unique 6-digit access code
   - **Important**: Save this access code! It's required to log in to the clue hunt

2. **Team Login**:
   - Enter your team name and 6-digit access code
   - The system will verify your credentials before allowing access

3. **Solving Clues**: After logging in, the application will present clues sequentially.

4. **Leaderboard**: Check the "Leaderboard" tab to see team rankings from the Google Sheet.

5. **Admin Panel**: Access the admin panel to manage team scores.
   - Default admin password: `admin123`

## Security Features

The application includes security mechanisms to ensure only registered teams can participate:

- Each team receives a unique 6-digit access code during registration
- Access codes are stored in Google Sheets alongside team information
- Team verification is required before accessing clues
- No ability to brute force codes due to rate limiting and validation

## Development Notes

For the demo version, all data is stored in memory and will be reset when the server restarts.

## Technologies Used

- Frontend: React.js with Vite
- Backend: Express.js
- Database: Google Sheets API
- Authentication: Google Service Account and custom team access codes
- Caching: Node-Cache for API responses
