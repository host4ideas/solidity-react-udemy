pragma solidity ^0.8.7;

/*
    When our grandfather passes away he can transact ether to someone
*/
contract Will {
    address private owner;
    uint private fortune;
    bool private deceased;

    // payable allows the function to send and receive ether
    constructor() payable {
        // the owner will be the representation of who is calling the function, accesible through msg
        owner = msg.sender; // msg sender represents address that is being called
        fortune = msg.value; // msg value tell us how much ether is being sent
        deceased = false;
    }

    /*
        modifiers are addons for functions to give additional logic for them,
        for example conditional statement
    */
    // create modifier so the only person who can call the contract s the owner
    modifier onlyOwner {
        require (msg.sender == owner);
        // The _ tells us to shift to the actual function once the modifier is run
        _;
    }

    // create modifier so that we only allocate funds if friend's gramps deceased
    modifier mustBeDeceased {
        require (deceased == true);
        // The _ tells us to shift to the actual function once the modifier is run
        _;
    }

    // create a list of addresses where to inherit gramp ether
    address payable[] private familyWallets;

    // when we map through we iterate through key store
    mapping(address => uint) private inheritance;

    // set new wallets in familyWallets and amounts as values in inheritance
    function setInheritance(address payable wallet, uint amount) public {
        familyWallets.push(wallet);
        inheritance[wallet] = amount;
    }

    /*
        Pay each family member based on their address
        We'll use the modifier to condition the execution of the function
    */
    function payout() private mustBeDeceased {
        for(uint i = 0; i < familyWallets.length; i++) {
            // Transfering the funds from contract address to receiver address
            familyWallets[i].transfer(inheritance[familyWallets[i]]);
        }
    }

    // Oracle switch simulation
    function hasDeceased() public onlyOwner {
        deceased = true;
        payout();
    }
}