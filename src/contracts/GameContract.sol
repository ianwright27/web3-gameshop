// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

contract GameContract {
    address immutable i_owner;

    struct GamerInfo {
        uint256 score;
        address player;
        string seedValue;
        string gameVersion;
    }

    address payable[] s_players; // all players

    mapping(address => GamerInfo[]) public gamerRecords;

    constructor() {
        i_owner = msg.sender;
    }
}
