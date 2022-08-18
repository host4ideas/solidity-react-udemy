/* 
OK It is time for your first real deal coding from scratch DeFi assignment!
I hope you are ready - ready or not - it's time for us to dig in.

Your mission here is to build a smart contract given everything we've learnt up to this point that can 
add investor wallets to a decentralized bank and then allocate (pay) them funds. 

It may sound daunting, but if you go back through all the videos you will find all that you need to succeed in this.
(it's not as hard as it sounds - I promise)

Once you've completed the the smart contract, debugged, and compiled, go ahead and deploy the contract and test it out.
If it is successful you should be able to select different accounts from our test accounts and use the payInvestors functions
to send funds. Pay a few accounts some funds of your choose and when you're done run the checkInvestors testing function.
If your code is working not only should you have successful transaction, but the checkInvestors function should return to you how 
many investors wallets have been added to your bank! 

When you have completed the assignment post your code solution in the #smart-contracts channel in discord and share with the community.

If you get stuck take a break and ask the community for help! The more you ask questions and engage other coders the better you will become.

Exercise: 
1. Create a contract called AddressWallets which wraps around the function checkInvestors below.
2. Create an empty array of addresses which is payable called investorWallets
3. Write a libaray of keys and values named investors where the keys are addresses and the values are integers. 
4. Write a payable function called payInvestors which takes the parameters address and amount.
5. Write logic in the function so that it can add new wallets to investorWallets and fill them with amounts of your choosing. 
6. Combine the address link to the array and map to do this correctly.
7. Compile, deploy, and test your solution with the checkInvestors functions. 
8. Post your solution in the #smart-contracts channel in the discord.

Best of luck!!

Use the following steps as a guide.


It's time for a loooooooping assignment! ;)

On the previous assignment your mission was to be able to run successful transactions to your investors by 
setting up their accounts and allocating funds. However, the bad news is that we weren't actually sending any real ether over - 
just amounts attached to nothing which is why we didn't see the accounts balances change. But now it's time to actually write in 
the functionality so that not only do our investors get added to the wallets with amounts; but those amounts equal real ether 
payouts because what's the point of getting amounts if you can't actually get the ether! $$$

So let's finish these thing properly with the power of for loops in Solidity!
Remember these assignments are optional and can be tough so if you get stuck please ask questions in the discord community! 

Exercise:
1. Create a constructor function which can allocate an initial payable value to the contract upon deplayment. 
2. Create a function called payout which explicity prohibits outside visibility in the strict sense. 
3. Write a for loop in the function that iterates over all the wallets of the investors.
4. While iterating through the wallets the loop should return a transfers of ethers equal to the amounts in each walet.
(hint: You need to transfer into the investorWallet by checking each investor address matched up to investorWallets of the index)
5. Write a function called makePayment which can then execute the payout function once deployed. 
6. Deploy the contract and test for successful transactions. (Hint: watch out for wei conversations!!)
7. Share your solution in the s#mart-contracts channel in our discord! 

Good luck! The investors are counting on you ;)
*/

pragma solidity >= 0.7.0 < 0.9.0;

contract AddressWallets {
    uint private fortune;

    constructor() payable {
        fortune = msg.value;
    }

    // List of investor addresses
    address payable[] private investorWallets;

    // Map of investor addresses and their amount of ether to transfer to them
    mapping(address => uint) private investors;

    function checkInvestors() public view returns (uint) {
        return investorWallets.length;
    }

    function payInvestors(address payable investor, uint amount) public {
        investorWallets.push(investor);
        investors[investor] = amount;
    }

    function payout() private {
        for(uint i = 0; i < investorWallets.length; i++){
            investorWallets[i].transfer(investors[investorWallets[i]]);
        }
    }

    function makePayment() public {
        payout();
    }
}
