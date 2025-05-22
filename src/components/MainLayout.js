import React, { useState } from "react";
import GameEmbed from "./GameEmbed";
import ReactPlayer from "react-player"; // For the music player
import LogoImage from "../img/sample-logo.png.jpg";
import "./MainLayout.css";

// generate a random seed
const generateRandomSeed = () => {
  var characters = "0123456789abcdefghijklmnopqrstuvwxyz";
  var randomSeed = "";
  for (var i = 0; i < 44; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    randomSeed += characters.charAt(randomIndex);
  }
  return randomSeed;
};

// truncate a string (useful for wallet addresses and long seed values) 
const truncateStr = (fullStr, strLen) => {
  if (fullStr.length <= strLen) return fullStr;
  const separator = "...";
  let separatorLength = separator.length;
  const charsToShow = strLen - separatorLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.substring(0, frontChars) +
    separator +
    fullStr.substring(fullStr.length - backChars)
  );
};

const MainLayout = () => {
  const [seed, setSeed] = useState("0");
  const [score, setScore] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [playingContractChallenges, setPlayingContractChallenges] = useState(false); 
  const [currentChallengePlaying, setCurrentChallengePlaying] = useState(0); 
  let contractChallenges = [
    {
      index: 1, 
      creator: "0xAb...F1",
      gameMintScore: 5000,
      gameMintPrice: "0.1", // 0.1 ETH in wei
      gameSeedValue: 1234, 
      gameMintNumPlayers: 10,
      registeredPlayers: 7,
      winners: 2,
      expiryTime: 3, // days left
      isSolved: false,
      notPlayable: false,
    },
    {
      index: 2, 
      creator: "0x98...56",
      gameMintScore: 8000,
      gameMintPrice: "0.25", // 0.25 ETH
      gameSeedValue: 434, 
      gameMintNumPlayers: 5,
      registeredPlayers: 5,
      winners: 1,
      expiryTime: 1,
      isSolved: true,
      notPlayable: false,
    },
    {
      index: 3, 
      creator: "0x11...99",
      gameMintScore: 12000,
      gameMintPrice: "0.5", // 0.5 ETH
      gameSeedValue: 5453, 
      gameMintNumPlayers: 15,
      registeredPlayers: 10,
      winners: 4,
      expiryTime: 7,
      isSolved: false,
      notPlayable: true,
    },
    {
      index: 4, 
      creator: "0x22...88",
      gameMintScore: 1500,
      gameMintPrice: "0.05", // 0.05 ETH
      gameSeedValue: 121, 
      gameMintNumPlayers: 8,
      registeredPlayers: 3,
      winners: 0,
      expiryTime: 5,
      isSolved: false,
      notPlayable: false,
    },
    {
      index: 5, 
      creator: "0x33...77",
      gameMintScore: 9500,
      gameMintPrice: "0.3", // 0.3 ETH
      gameSeedValue: 5343, 
      gameMintNumPlayers: 20,
      registeredPlayers: 20,
      winners: 10,
      expiryTime: 2,
      isSolved: true,
      notPlayable: false,
    }
  ];
  
  // fetched from mysql (ideally) 
  let highestScoresRecorded = [
    { rank: 1, player: "anonymous", score: 5451 },
    { rank: 1, player: "anonymous", score: 3520 },
    { rank: 1, player: "anonymous", score: 3001 },
  ];

  /* MUSIC FUNCTIONALITIES */
  let soundHelixSongs = [];
  for (var i = 0; i < 17; ++i) {
    soundHelixSongs.push({
      title: `Song ${i + 1}`,
      song: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${
        i + 1
      }.mp3`,
    });
  }

  const [currentTrack, setCurrentTrack] = useState(0);
  const musicList = soundHelixSongs;

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % musicList.length);
    setMusicPlaying(true); // play the music
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + musicList.length) % musicList.length);
    setMusicPlaying(true); // play the music
  };

  /* end of MUSIC FUNCTIONALITIES */

  // callback to update the score
  const handleScoreUpdate = (newScore) => {
    setScore(newScore); // new score
    setMusicPlaying(false); // pause music
  };

  // Function to start a new game with a random seed
  const handleNewGame = () => {
    const randomSeed = generateRandomSeed(); // Generate a random seed
    setSeed(randomSeed);
    console.log(`New Game started with seed: ${randomSeed}`);
    // reset previous score to 0
    setScore(0);
    // reset playingContractChallenges 
    setPlayingContractChallenges(false); 
    if (!musicPlaying) setMusicPlaying(true); // play the music
  };

  const handlePlayChallenge = (id, seedValue) => {
    setSeed(seedValue); // Restart game with specific seed 
    setPlayingContractChallenges(true); // reset playingContractChallenges 
    setCurrentChallengePlaying(id); // set the current challenge 
  }; 

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Column */}
        <div className="col-3 bg-light d-flex flex-column align-items-center justify-content-between">
          {/* First Section: Game Title & Logo */}
          <div className=" p-2 text-center d-flex flex-column align-items-center justify-content-center">
            <img
              className="logoImage mb-1"
              src={LogoImage}
              alt="Game Logo"
              style={{ maxWidth: "100px" }}
            />
            <h5 className="logoText">ArcadeMania</h5> 
            <p className="logoTextTagLine text-center" style={{ width: "80%" }}>Bringing arcade game culture to Web3, play to earn, just like old times!</p>
            
          </div>

          {/* Second Section: Game Controls */}
          <div className=" d-flex flex-column align-items-center justify-content-center">
            <h5 className="scoreText">Score: {score}</h5>
            {/* <h5>Game Controls</h5> */}
            <button
              className="newGameBtn"
              style={{ width: "70%" }}
              onClick={handleNewGame}
            >
              New Game 🎮
            </button>

            <br></br>
            <p className="gameInstructions" style={{ width: "70%" }}>
              <span className="underline">Instructions</span>
              <br></br>
              <strong>
                <i>SPACEBAR</i>
              </strong>{" "}
              - play/pause/try again<br></br>
              <strong>
                <i>LEFT</i>
              </strong>{" "}
              - steer left <br></br>
              <strong>
                <i>RIGHT</i>
              </strong>{" "}
              - steer right <br></br>
              <br></br>
              <span className="underline">Tips</span>
              <br></br>
              1. Avoid obstacles<br></br>
              2. Collect the purple boxes to gain reputation<br></br>
              3. Try not to go off the screen<br></br>
              4. Play a challenge (bottom right) to earn real money in your
              MetaMask wallet 🤑💸💰 <br></br>
            </p>
          </div>

          {/* Third Section: Music Player */}
          <div className="musicPlayer mb-4">
            <h5 className="musicText">Music</h5>
            <div className="d-flex justify-content-between align-items-center">
              <p className="nowPlayingText">
                Now Playing: <strong>{musicList[currentTrack].title}</strong>
              </p>
              <div className="moreControls">
                <button onClick={handlePrev}>⏪</button>
                <button onClick={handleNext}>⏩</button>
              </div>
            </div>
            <ReactPlayer
              url={musicList[currentTrack].song}
              playing={musicPlaying}
              controls
              width="100%"
              height="45px"
              className="reactPlayer"
              onEnded={handleNext} // Play the next song when the current one ends
            />{" "}
          </div>
        </div>

        {/* Center Column: Game */}
        <div className="col-6 bg-light d-flex align-items-center justify-content-center">
          <GameEmbed onScoreUpdate={handleScoreUpdate} seed={seed} />
        </div>

        {/* Right Column: Data & Wallet */}
        <div className="col-3 bg-light d-flex flex-column align-items-center justify-content-between">
          {/* First Section: Wallet Connection */}
          <div className="mb-4 p-2">
            {/* <h5>Wallet Connection</h5> */}
            <button className="connectWalletBtn">Connect Wallet</button>
            <p className="connectedAddressText">
              Address: <em>0x123...abcd</em>
            </p>
          </div>

          {/* Second Section: Highest Recorded Scores */}
          <div className="mb-4">
            <h5 className="highestScoresText">Highest Scores</h5>
            <ul className="list-group highestScoresList">
              {/* <li className="list-group-item">Player1 - 5000</li>
              <li className="list-group-item">Player2 - 4500</li>
              <li className="list-group-item">Player3 - 4000</li> */}
              {highestScoresRecorded.map((highScore) => (
                <li key={highScore.player} className="list-group-item">
                  {highScore.player} {" - "} {highScore.score}
                </li>
              ))}
            </ul>
          </div>

          {/* middle section between 2nd and 3rd */} 
          <div className="mb-4"> 
              <h5 className="logsText">Logs</h5>
              {
              !playingContractChallenges && (<div className="logsContainer">
                <span>Game Mode: Normal</span> 
                <br></br>
                <span>✅ Currently playing {truncateStr(seed, 8)}</span>
                </div>)
              }
              {
              playingContractChallenges && (<div className="logsContainer"> 
                <span>Game Mode: Challenge</span> 
                <br></br>
                <span>✅ Currently playing challenge #{currentChallengePlaying}</span>
                </div>)
              }
              </div>

          {/* Third Section: Play-To-Earn Challenges */}
          <div className="mb-5">
            <h5 className="challengesText">Challenges</h5>
            <ul className="list-group gameChallenges">
              {contractChallenges.map((challenge) => (
                <li
                  key={challenge.index}
                  className="list-group-item"
                  onClick={() => handlePlayChallenge(challenge.index, challenge.gameSeedValue)}
                >
                  {challenge.index}
                  {") "}
                  <strong>{challenge.creator}</strong>
                  <span className="moneyFlash">
                    {challenge.gameMintPrice}{" ETH"}
                  </span>
                  - Score: {challenge.gameMintScore}
                </li>
              ))}
            </ul>
            <button className="moreChallengesBtn" data-bs-toggle="modal" data-bs-target="#challengesModal">View More</button>
          </div>
        </div>


        {/* Bootstrap Modal */}
        <div
          className="modal fade"
          id="challengesModal"
          tabIndex="-1"
          aria-labelledby="challengesModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="challengesModalLabel">Top Challenges</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Creator</th>
                        <th>Score</th>
                        <th>Price</th>
                        <th>Players</th>
                        <th>Registered</th>
                        <th>Winners</th>
                        <th>Expires</th>
                        <th>Solved</th>
                        <th>Playable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contractChallenges.map((c) => (
                        <tr key={c.index} 
                        className="individualContractChallenges" 
                        onClick={() => handlePlayChallenge(c.index, c.gameSeedValue)}
                        data-bs-toggle="modal" data-bs-target="#challengesModal">
                          <td>{c.index}</td>
                          <td>{c.creator}</td>
                          <td className="scoreField">{c.gameMintScore}</td>
                          <td>{c.gameMintPrice}ETH</td>
                          <td>{c.gameMintNumPlayers}</td>
                          <td>{c.registeredPlayers}</td>
                          <td>{c.winners}</td>
                          <td>{c.expiryTime} days</td>
                          <td>{c.isSolved ? "✅" : "❌"}</td>
                          <td>{c.notPlayable ? "❌" : "✅"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <span>[+] Click a challenge to play! 🎮</span>
                <br></br>
                <span>[+] Tip: wait a few seconds for that game to load!!! 🕜</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MainLayout;
