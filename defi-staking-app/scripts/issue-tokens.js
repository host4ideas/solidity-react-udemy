const DecentralBank = artifacts.require("DecentralBank");

async function issueRewards(callback) {
    let decentralBank = await DecentralBank.deployed();
    await decentralBank.issueTokens();
    console.log("Tokens have been issued successfully!");
    callback();
}

export default issueRewards;
