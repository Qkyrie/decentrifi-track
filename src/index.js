import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import {hooks as metaMaskHooks, metaMask} from "./hooks/metamask";
import {Web3ReactProvider} from "@web3-react/core";

Modal.setAppElement("#root");


const connectors = [
    [metaMask, metaMaskHooks]
]

ReactDOM.render(
    <Web3ReactProvider lookupENS={false} connectors={connectors}>
        <App/>
    </Web3ReactProvider>,

    document.getElementById("root")
);
