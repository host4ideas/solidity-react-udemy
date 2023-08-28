import React from "react";
import bank from "../bank.png"; //image

export default function Navbar({ account }) {
    return (
        <div>
            <nav
                className="navbar navbar-dark fixed-top shadow p-0"
                style={{ backgroundColor: "#000", height: "50px" }}
            >
                <a
                    style={{ color: "white" }}
                    className="navbar-brand col-sm-3  col-md-2 mr-0"
                    href="#"
                >
                    <img
                        src={bank}
                        alt="bank icon"
                        width="50"
                        height="30"
                        className="d-inline-block align-top mr-4"
                    />
                    Dapp Yield Farming
                </a>
                <ul className="navbar-nav px-3">
                    <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
                        <h3 style={{ color: "white" }}>
                            Acount Number: {account}
                        </h3>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
