import React, {useEffect} from 'react';
import useTokenviewHooks from "./hooks/tokenview-hooks";

import {useParams} from "react-router-dom";
import tw from "twin.macro";
import ReactGA from "react-ga4";
import Navbar from "../../components/Navbar/Navbar";
import TokenStats from "./partials/TokenStats";
import {SendERC20} from "./partials/SendERC20";
import useWeb3 from "../../hooks/web3";
import ConnectWalletSection from "../../components/ConnectWalletSection/ConnectWalletSection";

const Wrapper = tw.div`flex grid justify-items-center flex-wrap lg:flex-nowrap pt-4`;
const NavbarWrapper = tw.div`lg:w-1/3 w-2/3`


export default function TokenView() {
    const params = useParams();
    const networkName = params.network;
    const tokenAddress = params.token;

    const web3 = useWeb3();

    const {
        userBalance,
        token,
        network,
        refresh,
    } = useTokenviewHooks(
        networkName, tokenAddress
    );

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }, [])

    const tabs = [{
        name: 'Send Tokens',
        id: 'send-erc20',
        selected: true
    }]

    function SendERC20Tab() {
        if (tabs.find(element => element.id === 'send-erc20' && element.selected === true)) {
            return <SendERC20 refresh={refresh} userBalance={userBalance} token={token}/>
        } else {
            return <></>
        }
    }


    const detail = function () {
        if (token == null) {
            return <></>
        } else {
            return (
                <>
                    <TokenStats network={network} token={token} userBalance={userBalance}/>

                    <Wrapper>
                        {
                            !web3.active &&
                            <ConnectWalletSection ></ConnectWalletSection>
                        }
                        {
                            web3.active &&
                            <>
                                <NavbarWrapper>
                                    <Navbar items={
                                        tabs
                                    }/>
                                </NavbarWrapper>
                                <SendERC20Tab></SendERC20Tab>
                            </>
                        }

                    </Wrapper>
                </>
            );
        }
    }();

    if (token !== null) {
        return <>
            <div>
                {detail}
            </div>
        </>;
    } else {
        return (
            <></>
        )
    }
};