pragma solidity ^0.8.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    RWD public rwd;
    Tether public tether;

    address[] public stakers;

    // mapping to keep track of balances
    mapping(address => uint256) public stakingBalance;
    // mapping to keep track of accounts that has staked
    mapping(address => bool) public hasStaked;
    // mapping to keep track of accounts that are staking
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // function for depositing the Staking
    function depositTokens(uint256 _amount) public {
        // require the staking amount to be great than 0
        require(_amount > 0, "amount cannot be 0");

        // transfer Tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount); // to, from, value

        //update stakingbalance
        stakingBalance[msg.sender] += _amount;

        // if not staked, add their address to the Stakers list/array
        if (!hasStaked[msg.sender]) {
            // Since Solidity 0.8.0 msg.sender is not automatically payable, we need to make it payable
            stakers.push(payable(msg.sender));
        }

        //Update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstake tokens
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        // require the amount to be greater than zero
        require(balance > 0, "stake balance can't be less than zero");

        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;

        // Transfer the tokens to the specified contract address from our bank
        tether.transfer(msg.sender, balance);
    }

    // Issue rewards
    function issueTokens() public {
        // Require the owner to issue the tokens only
        require(msg.sender == owner, "Only the owner can issue rewards");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9; // divided by 9 to create percentage incentive
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }
}
