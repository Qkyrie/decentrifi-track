import React, {useEffect} from 'react';
import useTokenviewHooks from "./hooks/tokenview-hooks";

import {useParams} from "react-router-dom";
import tw from "twin.macro";
import ReactGA from "react-ga4";
import Navbar from "../../components/Navbar/Navbar";
import TokenStats from "./partials/TokenStats";
import FallbackImage from "../../components/Image/FallbackImage";
import PrimaryButton from "../../components/Button/PrimaryButton";
import TwoColumnWithInput from "../../components/hero/TwoColumnWithInput";
import SearchField from "../../components/Search/SearchField";
import styled from "styled-components";

const Wrapper = tw.div`flex grid justify-items-center flex-wrap lg:flex-nowrap pt-4`;
const NavbarWrapper = tw.div`lg:w-2/3`


const Container = styled.div`
  ${tw`mb-2 pt-2 text-gray-600 flex flex-nowrap w-full`}
  input {
    ${tw`w-11/12 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none`}
  }
`

export default function TokenView() {
    const params = useParams();
    const networkName = params.network;
    const tokenAddress = params.token;

    const tokenViewHooks = useTokenviewHooks(
        networkName, tokenAddress
    );

    const {
        userBalance,
        token,
        network,
    } = tokenViewHooks;


    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }, [])

    const tabs = [{
        name: 'Send',
        id: 'send-erc20',
        selected: true
    }]

    function FarmingTab() {
        if (tabs.find(element => element.id === 'send-erc20' && element.selected === true)) {
            return (
                <div tw="w-full grid justify-items-center">
                    <div tw="flex flex-row my-12 w-1/3">
                        <div tw="mx-2 w-2/12 text-right">
                            Asset:
                        </div>
                       <div tw="w-10/12 flex-row flex mx-2">
                           <div tw="w-6 h-6 ml-4">
                               <FallbackImage src={token.logo}/>
                           </div>
                           <div>
                               {token.name} ({token.symbol})
                           </div>
                       </div>
                    </div>
                    <div tw="flex w-1/3">
                        <div tw="flex-col mx-2 text-right w-2/12">
                            Amount:
                            <div>
                                <PrimaryButton label={"max"}></PrimaryButton>
                            </div>
                        </div>
                        <div tw="w-10/12 mx-2">
                            <div tw="grid justify-items-end ml-4">
                                <Container>
                                    <input datatype={"number"}
                                        type="search" name="amount" placeholder="0.00"/>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            )
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
                        <NavbarWrapper>
                            <Navbar items={
                                tabs
                            }/>
                        </NavbarWrapper>
                        <FarmingTab></FarmingTab>
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