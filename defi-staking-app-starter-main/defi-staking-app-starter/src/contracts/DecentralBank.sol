pragma solidity ^0.8.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    RWD public rwd;
    Tether public tether;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
    }
}
