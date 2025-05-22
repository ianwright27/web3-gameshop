import React, { useState, useEffect } from "react";
import "./MainLayout.css";
import { truncateStr, generateRandomSeed } from "../utils/utils";
import GameControls from "./GameControls"; 
import GamePanel from "./GamePanel"; 
import RightPanel from "./RightPanel";
import ChallengesModal from "./ChallengesModal";

import contractChallengesData from "../data/contractChallengesData";

const MainLayout = () => {
  const [seed, setSeed] = useState("0");
  const [score, setScore] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [playingContractChallenges, setPlayingContractChallenges] = useState(false); 
  const [currentChallengePlaying, setCurrentChallengePlaying] = useState(0); 
  const [contractChallenges, setContractChallenges] = useState(contractChallengesData);
  
  useEffect(() => {
  setContractChallenges(contractChallengesData);
}, [contractChallengesData]);

  
  const [batteryLevel, setBatteryLevel] = useState(1); // default to full
  const [isBatterySufficient, setIsBatterySufficient] = useState(true);

  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(battery.level);
        setIsBatterySufficient(battery.level > 0.3); // set threshold at 30%

        battery.addEventListener('levelchange', () => {
          setBatteryLevel(battery.level);
          setIsBatterySufficient(battery.level > 0.3);
        });
      });
    } else {
      // Battery API not supported, allow playing by default or fallback logic
      setIsBatterySufficient(true);
    }
  }, []);

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
    // make sure battery level is sufficient (to prevent exploits)
    if (!isBatterySufficient) {
      alert('Your battery is low. Please charge your device to play for fair scores.');
      return;
    }
    setScore(0); // Reset score to zero when one begins a challenge 
    setSeed(seedValue); // Restart game with specific seed 
    setPlayingContractChallenges(true); // reset playingContractChallenges 
    setCurrentChallengePlaying(id); // set the current challenge 
  }; 

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Column */}
        <div className="col-3 bg-light d-flex flex-column align-items-center justify-content-between">
          <GameControls
            score = {score} 
            handleNewGame = {handleNewGame}
            musicList = {musicList}
            currentTrack = {currentTrack}
            handlePrev = {handlePrev}
            handleNext = {handleNext}
            musicPlaying = {musicPlaying} 
          />
        </div>

        {/* Center Column: Game */}
        <div className="col-6 bg-light d-flex align-items-center justify-content-center">
          <GamePanel
          seed = {seed} 
          handleScoreUpdate = {handleScoreUpdate}
          />
        </div>

        {/* Right Column: Data & Wallet */}
        <div className="col-3 bg-light d-flex flex-column align-items-center justify-content-between">
          <RightPanel
           highestScoresRecorded = {highestScoresRecorded}
           contractChallenges = {contractChallenges}
           handlePlayChallenge = {handlePlayChallenge}
           playingContractChallenges = {playingContractChallenges}
           currentChallengePlaying = {currentChallengePlaying} 
           seed = {seed} 
           truncateStr = {truncateStr} 
          />
        </div>


        {/* Bootstrap Modal */}
        <ChallengesModal 
        contractChallenges={contractChallenges}  
        handlePlayChallenge={handlePlayChallenge}
        />


      </div>
    </div>
  );
};

export default MainLayout;
