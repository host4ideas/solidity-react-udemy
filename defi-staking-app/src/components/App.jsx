import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import ParticleSettings from "./ParticleSettings";
import "./App.css";

export default function App() {
    const [account, setAccount] = useState("0x0");
    const [tether, setTether] = useState({});
    const [rwd, setRwd] = useState({});
    const [decentralBank, setDecentralBank] = useState({});
    const [rwdBalance, setRwdBalance] = useState("");
    const [tetherBalance, setTetherBalance] = useState("");
    const [stakingBalance, setStakingBalance] = useState("");
    const [loading, setLoading] = useState(true);

    async function loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "No ethereum browser detected! You can check out Metamask!"
            );
        }
    }

    async function loadBlockhainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();

        // Load Tether Contract
        const tetherData = Tether.networks[networkId];
        if (tetherData) {
            // Contract
            const tetherContract = new web3.eth.Contract(
                Tether.abi,
                tetherData.address
            );
            setTether(tetherContract);
            // Balance
            let tetherBalance = await tetherContract.methods
                .balanceOf(accounts[0])
                .call();
            setTetherBalance(tetherBalance);
            setLoading(false);
        } else {
            window.alert("Tether contract not deployed to the network");
        }

        // Load RWD Contract
        const rwdData = RWD.networks[networkId];
        if (rwdData) {
            // Rwd contract
            const rwdContract = new web3.eth.Contract(RWD.abi, rwdData.address);
            setRwd(rwdContract);
            // Rwd balance
            let rwdBalance = await rwdContract.methods
                .balanceOf(accounts[0])
                .call();
            setRwdBalance(rwdBalance);
            setLoading(false);
        } else {
            window.alert("RWD contract not deployed to the network");
        }

        // Load DecentralBank Contract
        const decentralBankData = DecentralBank.networks[networkId];
        if (decentralBankData) {
            // Contract
            const decentralBankContract = new web3.eth.Contract(
                DecentralBank.abi,
                decentralBankData.address
            );
            setDecentralBank(decentralBankContract);
            // Balance
            let stakingBalance = await decentralBankContract.methods
                .stakingBalance(accounts[0])
                .call();
            setStakingBalance(stakingBalance);
            setLoading(false);
        } else {
            window.alert("Decentral Bank not deployed to the network");
        }
    }

    /**
     * Stakes the desired amount into DecentralBank
     * @param {Number} amount The desired stake amount in Wei
     */
    function stakeTokens(amount) {
        setLoading(true);
        // Approve the transaction to DecentralBank
        tether.methods
            .approve(decentralBank._address, amount)
            .send({ from: account })
            .on("transactionHash", () => {
                // Transfer from account to DecentralBank account
                decentralBank.methods
                    .depositTokens(amount)
                    .send({ from: account })
                    .on("transactionHash", () => {
                        console.log(stakingBalance);
                        console.log(amount);
                        console.log(stakingBalance + amount);

                        let updatedBalance =
                            parseInt(stakingBalance) + parseInt(amount);

                        // Update staking balance
                        setStakingBalance(updatedBalance);

                        updatedBalance =
                            parseInt(tetherBalance) - parseInt(amount);

                        // Update tethe balance
                        setTetherBalance(updatedBalance);

                        setLoading(false);
                    });
            });
    }

    /**
     * Unstakes all the staked balance
     */
    function unstakeTokens() {
        setLoading(true);
        if (stakingBalance > 0) {
            // Send back to the client the stakingBalance
            decentralBank.methods
                .unstakeTokens()
                .send({ from: account })
                .on("transactionHash", () => {
                    // Update Tether balance
                    tether.methods
                        .balanceOf(account)
                        .call()
                        .then((tetherBalance) => {
                            setTetherBalance(tetherBalance);
                        });
                    // Update Staking balance
                    setStakingBalance(0);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Fired on component mount. don't use async await
        loadWeb3();
        loadBlockhainData();
    }, []);

    return (
        <div className="app" style={{ position: "relative" }}>
            <div style={{ position: "absolute" }}>
                <ParticleSettings />
            </div>
            <Navbar account={account} />
            <div className="container-fluid mt-5">
                <div className="row">
                    <main
                        className="col-lg-12 ml-auto mr-auto"
                        style={{ maxWidth: "50vw" }}
                    >
                        {loading ? (
                            <p
                                id="loader"
                                className="text-center"
                                style={{ margin: "30px", color: "white" }}
                            >
                                LOADING PLEASE WAIT...
                            </p>
                        ) : (
                            <Main
                                tetherBalance={tetherBalance}
                                rwdBalance={rwdBalance}
                                stakingBalance={stakingBalance}
                                stakeTokens={stakeTokens}
                                unstakeTokens={unstakeTokens}
                                decentralBank={decentralBank}
                                account={account}
                            />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
