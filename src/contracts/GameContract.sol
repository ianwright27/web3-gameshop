// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract GameContract {
    struct Challenge {
        address creator;
        uint256 gameMintScore;
        uint256 gameMintPrice;
        uint256 gameMintNumPlayers;
        uint256 registeredPlayers;
        uint256 winners;
        uint256 expiryTime;
        bool isSolved;
        bool notPlayable;
        bool finalized;
    }

    struct PlayRecord {
        address player;
        uint256 score;
        uint256 amountPaid;
        bool won;
        bool refunded;
        uint256 challengeScore;
        string challengeStatus;
    }

    IERC721 public orangeBadge;
    IERC721 public blueBadge;

    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => mapping(address => bool)) public hasAccepted;
    mapping(uint256 => mapping(address => bool)) public hasPlayed;
    mapping(uint256 => PlayRecord[]) public challengePlayRecords;
    mapping(address => uint256) public creatorEarnings;

    uint256 public contractFeePercent = 5;
    uint256 public challengeCounter;
    address public owner;
    uint256[] public allChallengeIds;
    uint256 public constant REGISTER_TIME_LIMIT = 1 days;

    event ChallengeMinted(uint256 challengeId, address indexed creator, uint256 gameMintPrice, uint256 expiryTime);
    event ChallengeAccepted(uint256 challengeId, address indexed player);
    event ChallengePlayed(uint256 challengeId, address indexed player, bool won);
    event ChallengeSolved(uint256 challengeId);
    event ChallengeCancelled(uint256 challengeId);
    event RefundIssued(uint256 challengeId, address indexed player, uint256 amount);
    event RevenueWithdrawn(address indexed owner, uint256 amount);
    event CreatorEarningsWithdrawn(address indexed creator, uint256 amount);
    event ContractFeeUpdated(uint256 newFee);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor(address _orangeBadge, address _blueBadge) {
        owner = msg.sender;
        orangeBadge = IERC721(_orangeBadge);
        blueBadge = IERC721(_blueBadge);
    }

    function setContractFeePercent(uint256 _newFee) external onlyOwner {
        require(_newFee <= 100, "Fee too high");
        contractFeePercent = _newFee;
        emit ContractFeeUpdated(_newFee);
    }

    function mintChallenge(uint256 _score, uint256 _numPlayers, uint256 _price, uint256 _expiryTime) external payable {
        require(msg.value == _price, "Incorrect ETH sent");
        require(_expiryTime > block.timestamp + REGISTER_TIME_LIMIT, "Expiry too soon");
        require(blueBadge.balanceOf(msg.sender) > 0, "Must have Blue badge to mint");

        challengeCounter++;
        challenges[challengeCounter] = Challenge({
            creator: msg.sender,
            gameMintScore: _score,
            gameMintPrice: _price,
            gameMintNumPlayers: _numPlayers,
            registeredPlayers: 0,
            winners: 0,
            expiryTime: _expiryTime,
            isSolved: false,
            notPlayable: false,
            finalized: false
        });

        allChallengeIds.push(challengeCounter);
        emit ChallengeMinted(challengeCounter, msg.sender, _price, _expiryTime);
    }

    function acceptChallenge(uint256 _challengeId) external payable {
        Challenge storage challenge = challenges[_challengeId];
        require(!challenge.isSolved && !challenge.notPlayable, "Not playable");
        require(block.timestamp < challenge.expiryTime, "Expired");
        require(!hasAccepted[_challengeId][msg.sender], "Already accepted");
        require(msg.value == (challenge.gameMintPrice / challenge.gameMintNumPlayers), "Incorrect ETH sent");
        require(blueBadge.balanceOf(msg.sender) > 0, "Must have Blue badge to play");

        hasAccepted[_challengeId][msg.sender] = true;
        challenge.registeredPlayers++;

        emit ChallengeAccepted(_challengeId, msg.sender);
    }

    function playChallenge(uint256 _challengeId, uint256 _score) external {
        Challenge storage challenge = challenges[_challengeId];
        require(hasAccepted[_challengeId][msg.sender], "Did not accept challenge");
        require(!hasPlayed[_challengeId][msg.sender], "Already played");

        hasPlayed[_challengeId][msg.sender] = true;

        bool won = false;
        uint256 amountPaid = challenge.gameMintPrice / challenge.gameMintNumPlayers;

        if (_score >= challenge.gameMintScore) {
            challenge.winners++;
            payable(msg.sender).transfer(amountPaid);
            won = true;
        }

        challengePlayRecords[_challengeId].push(PlayRecord({
            player: msg.sender,
            score: _score,
            amountPaid: amountPaid,
            won: won,
            refunded: false,
            challengeScore: challenge.gameMintScore,
            challengeStatus: challenge.isSolved ? "Solved" : "Playable"
        }));

        emit ChallengePlayed(_challengeId, msg.sender, won);

        if (challenge.winners >= challenge.gameMintNumPlayers) {
            challenge.isSolved = true;
            emit ChallengeSolved(_challengeId);
        }

        if (challenge.registeredPlayers >= challenge.gameMintNumPlayers && !challenge.finalized) {
            _finalizeChallenge(_challengeId);
        }
    }

    function _finalizeChallenge(uint256 _challengeId) internal {
        Challenge storage challenge = challenges[_challengeId];
        if (!challenge.finalized) {
            uint256 losers = challenge.registeredPlayers - challenge.winners;
            if (losers > 0) {
                uint256 earnings = losers * (challenge.gameMintPrice / challenge.gameMintNumPlayers);
                uint256 fee = (earnings * contractFeePercent) / 100;
                uint256 payout = earnings - fee;
                creatorEarnings[challenge.creator] += payout;
            }
            challenge.finalized = true;
        }
    }

    function cancelChallenge(uint256 _challengeId) external {
        Challenge storage challenge = challenges[_challengeId];
        require(msg.sender == challenge.creator, "Not creator");
        require(challenge.registeredPlayers == 0, "Already players");
        require(block.timestamp >= challenge.expiryTime - REGISTER_TIME_LIMIT, "Cannot cancel yet");

        challenge.notPlayable = true;
        payable(msg.sender).transfer(challenge.gameMintPrice);
        emit ChallengeCancelled(_challengeId);
    }

    function withdrawContractRevenue() external onlyOwner {
        uint256 balance = address(this).balance;
        uint256 owed = balance;

        for (uint256 i = 1; i <= challengeCounter; i++) {
            owed -= creatorEarnings[challenges[i].creator];
        }

        require(owed > 0, "No revenue");
        payable(owner).transfer(owed);
        emit RevenueWithdrawn(owner, owed);
    }

    function withdrawCreatorEarnings() external {
        uint256 earnings = creatorEarnings[msg.sender];
        require(earnings > 0, "No earnings");
        creatorEarnings[msg.sender] = 0;
        payable(msg.sender).transfer(earnings);
        emit CreatorEarningsWithdrawn(msg.sender, earnings);
    }

    function refundPlayer(uint256 _challengeId, address _player) external onlyOwner {
        PlayRecord[] storage records = challengePlayRecords[_challengeId];
        for (uint256 i = 0; i < records.length; i++) {
            if (records[i].player == _player && !records[i].refunded && !records[i].won) {
                records[i].refunded = true;
                payable(_player).transfer(records[i].amountPaid);
                emit RefundIssued(_challengeId, _player, records[i].amountPaid);
                return;
            }
        }
        revert("No refundable record found");
    }
}
