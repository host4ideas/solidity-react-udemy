import React from "react";
import { useState, useEffect } from "react";

// Airdrop counts down after our customer have staked a certain amount
export default function Airdrop({ stakingBalance, decentralBank, account }) {
    // Start with 20 seconds
    let timer = 20000;
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    function msToHMS(ms) {
        // 1- Convert to seconds:
        let seconds = ms / 1000;
        // 2- Extract hours:
        // const hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // 3- Extract minutes:
        const minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
        // 4- Keep only seconds not extracted to minutes:
        seconds = seconds % 60;

        setMinutes(minutes);
        setSeconds(seconds);
    }

    function startTimer() {
        console.log(decentralBank._address);

        if (stakingBalance >= window.web3.utils.toWei("51", "Ether")) {
            let interval = setInterval(async () => {
                if (timer > 0) {
                    timer -= 1000;
                    msToHMS(timer);
                } else {
                    const owner = await decentralBank.methods.owner().call();

                    console.log(owner);
                    console.log(decentralBank._address);

                    await decentralBank.methods
                        .issueTokens()
                        .send({ from: owner })
                        .on("transactionHash", (hash) => {
                            alert("Tokens have been issued successfully!");
                        });

                    // const owner = await decentralBank.methods.owner().call();

                    // let transaction = decentralBank.methods.issueTokens();

                    // let signedTransaction = await window.web3.eth.accounts.signTransaction(
                    //     {
                    //         to: transaction._parent._address,
                    //         gas: await transaction.estimateGas({
                    //             from: decentralBank._address,
                    //         }),
                    //     },
                    //     "cb765a5ed273bbc7bc555c3346b97eab5ffd9ffcf9ddde69db199bc35a9f0ef9"
                    // );

                    // let transactionReceipt = await window.web3.eth.sendSignedTransaction(
                    //     signedTransaction.rawTransaction
                    // );

                    // console.log(transactionReceipt);

                    clearInterval(interval);
                }
            }, 1000);
        }
    }

    useEffect(() => {
        msToHMS(timer);
        if (decentralBank._address != null) startTimer();
    }, [stakingBalance]);

    return (
        <div style={{ color: "black" }}>
            {minutes}:{seconds}
        </div>
    );
}
