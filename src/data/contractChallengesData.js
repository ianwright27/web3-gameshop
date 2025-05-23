const contractChallengesData = [
    {
      index: 1, 
      creator: "0xAb...F1",
      gameMintScore: 2000,
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
      isSolved: false,
      notPlayable: true,
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
      isSolved: true,
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
      isSolved: true,
      notPlayable: true,
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
      isSolved: false,
      notPlayable: false,
    }
  ];
  
  export default contractChallengesData;