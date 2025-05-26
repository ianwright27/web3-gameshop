import React, {useState} from "react";
import ReactPlayer from "react-player";
import LogoImage from "../img/sample-logo.png.jpg";
import GameInfoModal from "./GameInfoModal";

const GameControls = ({
  score,
  handleNewGame,
  musicList,
  currentTrack,
  handlePrev,
  handleNext,
  musicPlaying,
}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  const openModal = () => setShowInfoModal(true);
  const closeModal = () => setShowInfoModal(false);
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
        <h5 className="logoText">Daxam</h5>
        <p className="logoTextTagLine text-center" style={{ width: "80%" }}>
          Where creators build worlds, and players conquer them! 🚀 
        </p>
      </div>

      {/* Game Controls */}
      <div className="d-flex flex-column align-items-center justify-content-center mb-5">
        <h5 className="scoreText">Score: {score}</h5>
        <br></br>
        
        <p className="selectedGame"><span className="dax">[Dax]</span>Cypher Racer</p>
        <button
          className="newGameBtn"
          style={{ width: "100%" }}
          onClick={handleNewGame}
        >
          New 🎮
        </button>

        {/* <br /> */}

        {/* Replace instructions/tips with one button */}
        <button
          className="btn btn-info gameInfoBtn"
          style={{ width: "100%" }}
          onClick={openModal}
        >
          View Info
        </button>

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
      {/* Game Info Modal */}
      {showInfoModal && <GameInfoModal show={showInfoModal} onClose={closeModal} />}
    </div>
  );
};

export default GameControls;
