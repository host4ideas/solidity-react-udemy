const RWD = artifacts.require("RWD");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, accounts) {
    // Deploy the mock Tether contract
    await deployer.deploy(Tether);
    const tether = await Tether.deployed();

    // Deploy the reward token
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    // Deploy the Decentral Bank
    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed();

    // Transfer all reward tokens to Decentral Bank
    await rwd.transfer(decentralBank.address, "1000000000000000000000000");
    // Distribute 100 Tether tokens to an investor (we'll use the second Ganache's wallet as an investor), the creator account will have 999900 tokens
    await tether.transfer(accounts[1], "100000000000000000000");
};
