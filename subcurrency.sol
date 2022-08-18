pragma solidity >= 0.7.0 < 0.9.0;

// The contract allows only the creator to create new coins
// Anyone can send coins to each other without need for registering

contract Coin {
    address private minter;
    mapping(address => uint) private balances;

    /*
        Event is an inheritable member of a contract. An event is emmited, it stores the arguments passed in transaction logs.
        These logs are sotres on the blockchain and are accessible using address of the contract until the contract
        is present on the blockchain.
    */
    event Sent(address from, address to, uint amount);

    constructor() {
        minter = msg.sender;
    }

    /*
        Make new coins and send them to an address
        Only the owner can send these coins
    */
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        balances[receiver] += amount;
    }

    error insufficientBalance(uint requested, uint available);

    // Send any amount of coins to an existing address
    function send(address receiver, uint amount) public {
        // Require the amount to be greater than x = true and then run this
        if(amount > balances[msg.sender]){
            // Stop the function for running
            revert insufficientBalance({
                requested: amount,
                available: balances[msg.sender]
            });
        }

        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}