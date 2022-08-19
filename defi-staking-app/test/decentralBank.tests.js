const { assert } = require("chai");
const RWD = artifacts.require("RWD");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
    .use(require("chai-as-promised"))
    .should();

contract("DecentralBank", async ([owner, customer]) => {
    let tether, reward, decentralBank;

    function tokens(number) {
        return web3.utils.toWei(number, "ether");
    }

    before(async () => {
        // load Contracts
        tether = await Tether.new();
        reward = await RWD.new();
        decentralBank = await DecentralBank.new(reward.address, tether.address);

        // check to see we transfer all RWD tokens to the DecentralBank (1 million)
        await reward.transfer(decentralBank.address, tokens("1000000"));

        // check for transfer of 100 tokens from Bank -> Investor
        /*
            Note that the sendCoin function in our Solidity contract doesn't have a third parameter. 
            What you see above is a special object that can always be passed as the last parameter 
            to a function that lets you edit specific details about the transaction ("transaction params"). 
            Here, we set the from address ensuring this transaction came from accounts[0].
        */
        await tether.transfer(customer, tokens("100"), { from: owner });
    });

    // All of the code goes here for testing
    describe("Mock Tether Deployment", async () => {
        it("matches name successfully", async () => {
            const name = await tether.name();
            assert.equal(name, "Mock Tether Token");
        });
        it("matches symbol successfully", async () => {
            const symbol = await tether.symbol();
            assert.equal(symbol, "mUSDT");
        });
    });
    describe("RWD Deployment", async () => {
        it("matches name successfully", async () => {
            const name = await reward.name();
            assert.equal(name, "Reward Token");
        });
        it("matches symbol successfully", async () => {
            const symbol = await reward.symbol();
            assert.equal(symbol, "RWD");
        });
    });
    describe("Decentral Bank Deployment", async () => {
        it("matches name successfully", async () => {
            const name = await decentralBank.name();
            assert.equal(name, "Decentral Bank");
        });
        it("contract has tokens", async () => {
            const balance = await reward.balanceOf(decentralBank.address);
            assert.equal(balance, tokens("1000000"));
        });
    });
    describe("Yield Farming", async () => {
        it("rewards tokens for staking", async () => {
            //check investor balance
            let result;
            result = await tether.balanceOf(customer);
            // should equal "100" (the amount they were sent from deployment)
            assert.equal(
                result.toString(),
                tokens("100"),
                "customer wallet balance before staking"
            );

            // Check staking for customer
            // send out the approval (send to decentralBank, from the customer)
            await tether.approve(decentralBank.address, tokens("100"), {
                from: customer,
            });
            // after ^ has been approved, we can deposit tokens to the decentralBank from our customer
            await decentralBank.depositTokens(tokens("100"), {
                from: customer,
            });
            // Check updated balance of customer
            result = await tether.balanceOf(customer);
            // should equal "100" (the amount they were sent from deployment)
            assert.equal(
                result.toString(),
                tokens("0"),
                "customer mock wallet balance after staking"
            );

            // Check the DecentralBank has 100 tokens
            result = await tether.balanceOf(decentralBank.address);
            // should equal "100" (the amount they were sent from deployment)
            assert.equal(
                result.toString(),
                tokens("100"),
                "DecentralBank mock wallet balance after staking"
            );

            // Check isStaking status
            result = await decentralBank.isStaking(customer);
            assert.equal(result, true, "customer staking status after stake");

            // Issue reward tokens
            await decentralBank.issueTokens({ from: owner });

            // Ensure only the owner can issue reward tokens
            await decentralBank.issueTokens({ from: customer }).should.be
                .rejected;

            // Check if we unstake tokens
            await decentralBank.unstakeTokens({ from: customer });

            // Check unstaking balances

            // Check updated balance of customer
            result = await tether.balanceOf(customer);
            // should equal "100" (the amount they were sent from deployment)
            assert.equal(
                result.toString(),
                tokens("100"),
                "customer mock wallet balance after unstaking"
            );

            // Check the DecentralBank has 100 tokens
            result = await tether.balanceOf(decentralBank.address);
            // should equal "100" (the amount they were sent from deployment)
            assert.equal(
                result.toString(),
                tokens("0"),
                "DecentralBank mock wallet balance after unstaking"
            );

            // Check isStaking status
            result = await decentralBank.isStaking(customer);
            assert.equal(result, false, "customer staking status after stake");
        });
    });
});
