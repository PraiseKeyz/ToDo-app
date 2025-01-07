import React, { useState, useEffect } from "react";
import "./TypingAnimation.css";

const TypingAnimation = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [index, text, speed]);

  return <h1 className="typing-animation">{displayedText}|</h1>;
};

export default TypingAnimation;