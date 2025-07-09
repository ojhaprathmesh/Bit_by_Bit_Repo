import { useEffect } from "react";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/img5.JPG";
import img6 from "../assets/img6.JPG";
import img7 from "../assets/img7.JPG";
import img8 from "../assets/img8.JPG";
import img9 from "../assets/img9.JPG";
import img10 from "../assets/img10.JPG";
import img11 from "../assets/img11.JPG";
import img12 from "../assets/img12.JPG";
import img13 from "../assets/img13.JPG";
import img14 from "../assets/img14.JPG";
import img15 from "../assets/img15.JPG";
import img16 from "../assets/img16.JPG";
import img17 from "../assets/img17.JPG";
import img18 from "../assets/img18.JPG";
import img19 from "../assets/img19.JPG";
import img20 from "../assets/img20.JPG";
import img21 from "../assets/img21.JPG";
import devfolio from "../assets/Devfolio.png";
import learners from "../assets/Leading Learners.webp";

const preloadImages = (images) => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const assets = {
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  devfolio,
  learners
};

const AssetLoader = () => {
  useEffect(() => {
    // Preload all the images
    preloadImages(Object.values(assets));
  }, []);

  return null; // This component doesn't need to render anything
};

export { assets, AssetLoader };
