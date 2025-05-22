import React from "react";
import ReactPlayer from "react-player";
import LogoImage from "../img/sample-logo.png.jpg";

const GameControls = ({
  score,
  handleNewGame,
  musicList,
  currentTrack,
  handlePrev,
  handleNext,
  musicPlaying,
}) => {
  return (
    <div className="p-2 text-center d-flex flex-column align-items-center justify-content-center">

      {/* Game Title & Logo */}
      <div className="p-2 text-center d-flex flex-column align-items-center justify-content-center">
        <img
          className="logoImage mb-1"
          src={LogoImage}
          alt="Game Logo"
          style={{ maxWidth: "100px" }}
        />
        <h5 className="logoText">Cypher Racer</h5>
        <p className="logoTextTagLine text-center" style={{ width: "80%" }}>
          Bringing arcade game culture to Web3, play to earn, just like old times!
        </p>
      </div>

      {/* Game Controls */}
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h5 className="scoreText">Score: {score}</h5>

        <button
          className="newGameBtn"
          style={{ width: "70%" }}
          onClick={handleNewGame}
        >
          New Game 🎮
        </button>

        <br />

        <p className="gameInstructions" style={{ width: "70%" }}>
          <span className="underline">Instructions</span>
          <br />
          <strong><i>SPACEBAR</i></strong> - play/pause/try again<br />
          <strong><i>LEFT</i></strong> - steer left <br />
          <strong><i>RIGHT</i></strong> - steer right <br /><br />

          <span className="underline">Tips</span><br />
          1. Avoid obstacles<br />
          2. Collect the purple boxes to gain reputation<br />
          3. Try not to go off the screen<br />
          4. Play a challenge (bottom right) to earn real money in your MetaMask wallet 🤑💸💰
        </p>
      </div>

      {/* Music Player */}
      <div className="musicPlayer mb-4" style={{ width: "90%" }}>
        <h5 className="musicText">Music</h5>
        <div className="d-flex justify-content-between align-items-center">
          <p className="nowPlayingText">
            Now Playing: <strong>{musicList[currentTrack]?.title}</strong>
          </p>
          <div className="moreControls">
            <button onClick={handlePrev}>⏪</button>
            <button onClick={handleNext}>⏩</button>
          </div>
        </div>

        <ReactPlayer
          url={musicList[currentTrack]?.song}
          playing={musicPlaying}
          controls
          width="100%"
          height="45px"
          className="reactPlayer"
          onEnded={handleNext}
        />
      </div>
    </div>
  );
};

export default GameControls;
