import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import {hooks as metaMaskHooks, metaMask} from "./hooks/connectors/metamask";
import {hooks as walletConnectHooks, walletConnectV2} from "./hooks/connectors/walletconnect";
import {Web3ReactProvider} from "@web3-react/core";

Modal.setAppElement("#root");


const connectors = [
    [metaMask, metaMaskHooks],
    [walletConnectV2, walletConnectHooks],
]

ReactDOM.render(
    <Web3ReactProvider lookupENS={false} connectors={connectors}>
        <App/>
    </Web3ReactProvider>,

    document.getElementById("root")
);
