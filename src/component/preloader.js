import React from "react";
import preloader from "./preloader.png";
import TypingAnimation from "./TypingAnimation.js"
import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={preloader} alt="" className="spinner" />
      <TypingAnimation text="To-Do" speed={100}/>
    </div>
  );
};

export default Preloader;
