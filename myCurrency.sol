pragma solidity >= 0.7.0 < 0.9.0;

/*
    Only the owner of the coin will be able to add founds to users.
    Users can transfer balance to other users.

*/
contract OwnCoin {
    // To set the deploy wallet as the OwnCoin owner
    address private owner;
    mapping(address => uint) private balances;

    constructor() {
        owner = msg.sender;
    }

    // Event of sending founds between two users
    event Sent(address from, address to, uint amount);
    // Event of adding founds
    event AddFounds(address receiver, uint amount);
    // Event of retire founds
    event WithDraw(address wallet, uint amount);
    // Event to show current balance
    event ShowBalance(address wallet, uint balance);

    // Modifier to check if the retiring amount is bigger than the available wallet's balance
    modifier checkBalance(address wallet, uint amount) {
        require(amount < balances[wallet], "Insufficient balance!!!");
        _;
    }

    function addFounds(address payable receiver, uint amount) public {
        require(msg.sender == owner, "Your are not the owner of the contract");
        balances[receiver] += amount;
        emit ShowBalance(receiver, balances[receiver]);
    }

    function withdraw(address payable wallet, uint amount) public checkBalance(wallet, amount) {
        require(msg.sender == wallet, "You are not the owner of the wallet");
        balances[wallet] -= amount;
        emit ShowBalance(msg.sender, balances[wallet]);
    }

    function send(address payable to, uint amount) public checkBalance(msg.sender, amount) {
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit ShowBalance(msg.sender, balances[to]);
        emit ShowBalance(msg.sender, balances[msg.sender]);
    }
}