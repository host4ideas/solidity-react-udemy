/*
    Create a contract that can store data and return the data back

    1. Receive information
    2. Store the information
    3. Return the information back

    A contract in Solidity terms id a collection of code (its functions) and data (its state) 
    that resides at a specific address on the Ethereum blockchain
*/
pragma solidity >= 0.7.0 <0.9.0;

contract SimpleStorage {
    // Write the functions and state here

    // State variable
    uint[] private storeData;

    // public enables visibility so that we can call this outside the contract
    function set(uint x) public {
        storeData.push(x);
    }

    // view tells this function that it cannot modify the state
    // returns tells that the function returns a type
    function get() public view returns (uint[] memory) {
        return storeData;
    }
}