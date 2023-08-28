import React from "react";
import { utils } from "web3";
import tetherImg from "../tether.png";
import Airdrop from "./Airdrop";

export default function Main({
    tetherBalance,
    rwdBalance,
    stakingBalance,
    stakeTokens,
    unstakeTokens,
    decentralBank,
    account,
}) {
    function handleSubmit(ev) {
        ev.preventDefault();
        let amount = ev.target.tokensAmount.value;
        if (amount > 0) {
            amount = utils.toWei(amount, "Ether");
            stakeTokens(amount);
        }
    }

    return (
        <div id="content" className="mt-5">
            <table className="table text-muted text-center">
                <thead>
                    <tr style={{ color: "white" }}>
                        <th scope="col">Staking Balance</th>
                        <th scope="col">Reward Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ color: "white" }}>
                        <td>
                            {utils.fromWei(stakingBalance.toString(), "Ether")}{" "}
                            USDT
                        </td>
                        <td>
                            {utils.fromWei(rwdBalance.toString(), "Ether")} RWD
                        </td>
                    </tr>
                </tbody>
            </table>
            <div
                className="card mb-2"
                style={{ opacity: ".9", padding: "10px" }}
            >
                <form action="" className="mb-3" onSubmit={handleSubmit}>
                    <div style={{ borderSpace: "0 1rem", textAlign: "center" }}>
                        <label htmlFor="stakeTokens" className="float-left">
                            <b>Stake Tokens</b>
                        </label>
                        <span
                            className="float-right"
                            style={{ marginRight: "8px" }}
                        >
                            Balance:{" "}
                            {utils.fromWei(tetherBalance.toString(), "Ether")}
                        </span>
                        <div className="input-group mb-4">
                            <input
                                id="stakeTokens"
                                name="tokensAmount"
                                type="text"
                                placeholder="0"
                                pattern="[0-9]+"
                                title="Please enter number only"
                                required
                            />
                            <div className="is-grouped">
                                <div className="input-group-text">
                                    <img
                                        src={tetherImg}
                                        alt="Tether"
                                        height="32"
                                    />
                                    &nbsp;&nbsp;&nbsp; USTD
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block"
                        >
                            DEPOSIT
                        </button>
                    </div>
                </form>
                <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={(e) => {
                        e.preventDefault();
                        unstakeTokens();
                    }}
                >
                    WITHDRAW
                </button>
                <div
                    className="card-body text-center"
                    style={{ color: "blue" }}
                >
                    <Airdrop
                        stakingBalance={stakingBalance}
                        decentralBank={decentralBank}
                        account={account}
                    />
                </div>
            </div>
        </div>
    );
}
