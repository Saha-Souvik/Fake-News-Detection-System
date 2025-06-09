import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import bgNews from "../image/news-bg.jpg";

const Layout = ({ children }) => {
  const fullText = "Fake News Detector";
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true); // for controlling loop

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval;

    if (typing) {
      typingInterval = setInterval(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === fullText.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            setTyping(false); // Start fade out after full typing
          }, 1000); // Wait 1s before fade out
        }
      }, 100);
    } else {
      // Clear text and restart typing after fade
      setTimeout(() => {
        setDisplayText("");
        setTyping(true);
      }, 1000); // Wait 1s before restart
    }

    return () => clearInterval(typingInterval);
  }, [typing]);

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgNews})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-4 w-full lg:mt-40">
        <div className="flex flex-col items-center text-white w-full max-w-2xl">
          <h1
            className={`
              text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg mb-10 whitespace-nowrap 
              transition-all duration-700 ease-in-out
              ${typing ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
              bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-600 text-transparent bg-clip-text
            `}
          >
            {displayText}
            <span className="border-r-2 border-white animate-pulse ml-1" />
          </h1>
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
