import React, { useRef, useEffect } from "react";

import GameImageOne from "../img/cypher-racer-1.png";
import GameImageTwo from "../img/cypher-racer-2.png";

const GameInfoModal = ({ show, onClose }) => {
  const modalRef = useRef(null);

useEffect(() => {
  let modalInstance;

  if (show && modalRef.current) {
    const modalEl = modalRef.current;
    modalInstance = new window.bootstrap.Modal(modalEl, { backdrop: true });
    modalInstance.show();

    const handleHide = () => onClose();

    modalEl.addEventListener("hidden.bs.modal", handleHide);

    return () => {
      modalEl.removeEventListener("hidden.bs.modal", handleHide);
      modalInstance.hide();

      // 🔥 Manually remove leftover backdrop (if any)
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((bd) => bd.remove());

      // 🔥 Reset body state (scroll lock)
      document.body.classList.remove("modal-open");
      document.body.style.overflow = ""; // reset overflow
    };
  }
}, [show, onClose]);



  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalRef}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cypher Racer</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column flex-md-row" style={{ gap: "1rem" }}>
            
            {/* Left Column: Screenshots */}
            <div className="modal-screenshots" style={{ flex: 1 }}>
                <img 
                src= {GameImageOne}
                alt="Cypher Racer Screenshot 1" 
                style={{ width: "100%", borderRadius: "8px", marginBottom: "0.5rem" }}
                />
                {/* Optional second image */}
                {/* <img 
                src= {GameImageTwo}
                alt="Cypher Racer Screenshot 2" 
                style={{ width: "100%", borderRadius: "8px" }}
                /> */}
            </div>

            {/* Right Column: Text Info */}
            <div className="modal-info gameInfo" style={{ flex: 1, textAlign: "left" }}>
                <h6>Description</h6>
                <p>
                You are a block, racing on a blockchain network. Try not to collide with other blocks.
                </p>

                <h6>Instructions</h6>
                <ul>
                <li><strong>SPACEBAR</strong> – play / pause / try again</li>
                <li><strong>LEFT</strong> – steer left</li>
                <li><strong>RIGHT</strong> – steer right</li>
                </ul>

                <h6>Tips</h6>
                <ol>
                <li>Avoid obstacles</li>
                <li>Collect purple boxes to gain reputation</li>
                <li>Stay on track — don’t fall off the screen</li>
                <li>Play a challenge (bottom right) to earn real money in your MetaMask wallet 🤑💸💰</li>
                </ol>
            </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default GameInfoModal;
