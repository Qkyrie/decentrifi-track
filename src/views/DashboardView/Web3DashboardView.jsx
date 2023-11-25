import React, {useEffect} from 'react';
import tw from "twin.macro";
import useWeb3 from "../../hooks/web3";
import ReactGA from "react-ga4";
import {useHistory} from "react-router-dom";
import ConnectWalletView from "../ConnectWalletView/ConnectWalletView";


import Unicorn from "../../images/unicorns/searching-unicorn.png";

export default function Web3DashboardView() {

    const web3 = useWeb3();
    const history = useHistory();

    const onAddressChange = (address) => {
        history.push(`/${address}/profile`);
    };

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }, [])

    if (web3.account != null) {
        history.push(`/${web3.account}/profile`);
        return <></>
    } else {
        return (
            <>
                <ConnectWalletView onAddressChange={onAddressChange}/>
            </>
        )
    }
};