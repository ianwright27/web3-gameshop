import React from "react";

const RightPanel = ({
  highestScoresRecorded,
  contractChallenges,
  handlePlayChallenge,
  playingContractChallenges,
  currentChallengePlaying,
  seed,
  truncateStr,
}) => {
  return (
    <>
      {/* Wallet Connection */}
      <div className="mb-4 p-2">
        <button className="connectWalletBtn">Connect Wallet</button>
        <p className="connectedAddressText">
          Address: <em>0x123...abcd</em>
        </p>
      </div>

      {/* Highest Recorded Scores */}
      <div className="mb-4">
        <h5 className="highestScoresText">Highest Scores</h5>
        <ul className="list-group highestScoresList">
          {highestScoresRecorded.map((highScore) => (
            <li key={highScore.player} className="list-group-item">
              {highScore.player} {" - "} {highScore.score}
            </li>
          ))}
        </ul>
      </div>

      {/* Logs Section */}
      <div className="mb-4">
        <h5 className="logsText">Logs</h5>
        {!playingContractChallenges && (
          <div className="logsContainer">
            <span>Game Mode: Normal</span>
            <br />
            <span>✅ Currently playing {truncateStr(seed, 8)}</span>
          </div>
        )}
        {playingContractChallenges && (
          <div className="logsContainer">
            <span>Game Mode: Challenge</span>
            <br />
            <span>✅ Currently playing challenge #{currentChallengePlaying}</span>
          </div>
        )}
      </div>

      {/* Play-To-Earn Challenges */}
      <div className="mb-5">
        <h5 className="challengesText">Challenges</h5>
        <ul className="list-group gameChallenges">
          {contractChallenges.map((challenge) => (
            <li
              key={challenge.index}
              className="list-group-item"
              onClick={() =>
                handlePlayChallenge(challenge.index, challenge.gameSeedValue)
              }
            >
              {challenge.index}) <strong>{challenge.creator}</strong>{" "}
              <span className="moneyFlash">
                {challenge.gameMintPrice} ETH
              </span>{" "}
              - Score: {challenge.gameMintScore}
            </li>
          ))}
        </ul>
        <button
          className="moreChallengesBtn"
          data-bs-toggle="modal"
          data-bs-target="#challengesModal"
        >
          View More
        </button>
      </div>
    </>
  );
};

export default RightPanel;
