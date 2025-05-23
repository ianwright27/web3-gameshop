import React from "react";

const ChallengesModal = ({ contractChallenges, handlePlayChallenge }) => {
  return (
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
            <h5 className="modal-title" id="challengesModalLabel">
              Top Challenges
            </h5>
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
                    <th>Earn</th>
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
                    <tr
                      key={c.index}
                      className="individualContractChallenges"
                      onClick={() =>
                        handlePlayChallenge(c.index, c.gameSeedValue)
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#challengesModal"
                    >
                      <td>{c.index}</td>
                      <td>{c.creator}</td>
                      <td className="scoreField">{c.gameMintScore}</td>
                      <td>{c.gameMintPrice}ETH</td>
                      <td>{(c.gameMintPrice / c.gameMintNumPlayers)}ETH</td>
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
            <br />
            <span>
              [+] Tip: wait a few seconds for that game to load!!! 🕜
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesModal;
