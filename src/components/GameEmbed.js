import React, { useEffect, useRef } from "react";

const GameEmbed = ({ onScoreUpdate, seed }) => {
  const iframeRef = useRef(null); // Reference for the iframe element

  let gameURL;
  gameURL =
    seed == "0"
      ? `http://127.0.0.1:5500/Box%20Highway/`
      : `http://127.0.0.1:5500/Box%20Highway/?seed=${seed}`;

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "http://127.0.0.1:5500") return;

      console.log("Message received from iframe:", event); // Debug log

      const { type, score } = event.data;
      if (type === "scoreUpdate") {
        onScoreUpdate(score);
        console.log("Score from game iframe:", score);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Automatically focus the iframe when seed changes
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  }, [seed]); // Dependency ensures this runs when seed changes

  const handleFocusIframe = () => {
    // Manually focus the iframe
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "98vh",
          maxWidth: "360px",
          margin: "0 auto",
          aspectRatio: "9 / 16",
        }}
        onClick={handleFocusIframe} // Focus iframe on container click
      >
        <iframe
          ref={iframeRef} // Attach the ref to the iframe
          src={gameURL}
          title="P5 Game"
          style={{ width: "100%", height: "100%", border: "none" }}
          tabIndex={-1} // Allows programmatic focus without appearing in tab order
        ></iframe>
      </div>
    </div>
  );
};

export default GameEmbed;
