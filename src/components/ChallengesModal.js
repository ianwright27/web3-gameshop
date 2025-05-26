import React, { useState } from "react";

const ChallengesModal = ({ contractChallenges, handlePlayChallenge }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const challengesPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(contractChallenges.length / challengesPerPage);

  // Slice challenges for current page
  const currentChallenges = contractChallenges.slice(
    (currentPage - 1) * challengesPerPage,
    currentPage * challengesPerPage
  );

  // Handlers
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

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
                  {currentChallenges.map((c) => (
                    <tr
                      key={c.index}
                      className="individualContractChallenges"
                      onClick={() =>
                        handlePlayChallenge(c.index, c.gameSeedValue)
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#challengesModal"
                      style={{ cursor: "pointer" }}
                    >
                      <td>{c.index}</td>
                      <td>{c.creator}</td>
                      <td className="scoreField">{c.gameMintScore}</td>
                      <td>{c.gameMintPrice}ETH</td>
                      <td>{(c.gameMintPrice / c.gameMintNumPlayers).toFixed(3)}ETH</td>
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

            {/* Pagination controls - only show if more than 5 */}
            {totalPages > 1 && (
              <nav aria-label="Challenges pagination" className="mt-3">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={handlePrev}>
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <li
                        key={pageNum}
                        className={`page-item ${
                          currentPage === pageNum ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      </li>
                    );
                  })}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={handleNext}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}

            <span>[+] Click a challenge to play! 🎮</span>
            <br />
            {/* <span>[+] Tip: wait a few seconds for that game to load!!! 🕜</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesModal; 