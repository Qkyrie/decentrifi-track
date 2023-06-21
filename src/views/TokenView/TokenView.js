import React, {useEffect, useMemo} from 'react';
import useTokenviewHooks from "./hooks/tokenview-hooks";
import FarmingOpportunities from "../../components/FarmingOpportunities/FarmingOpportunities";
import LendingOpportunities from "../../components/LendingOpportunities/LendingOpportunities";
import PoolingOpportunities from "../../components/PoolingOpportunities/PoolingOpportunities";

import {useParams} from "react-router-dom";
import tw from "twin.macro";
import ReactGA from "react-ga4";
import Navbar from "../../components/Navbar/Navbar";
import TokenStats from "./partials/TokenStats";

const Wrapper = tw.div`flex grid justify-items-center flex-wrap lg:flex-nowrap pt-4`;
const NavbarWrapper = tw.div`lg:w-2/3`

export default function TokenView() {
    const params = useParams();
    const networkName = params.network;
    const tokenAddress = params.token;

    const tokenViewHooks = useTokenviewHooks(
        networkName, tokenAddress
    );

    const {
        tabs,
        userBalance,
        token,
        poolingOpportunities,
        farmingOpportunities,
        lendingOpportunities,
        network,
    } = tokenViewHooks;

    const poolingOpportunitiesTitle = useMemo(() => {
        if (token == null) {
            return ''
        }

        if (token.type === 'SINGLE') {
            return 'Pooling Opportunities'
        } else {
            return 'Alternative Pooling Opportunities'
        }
    }, [token])

    function LendingTab() {
        if (tabs.find(element => element.id === 'Lending' && element.selected === true)) {
            return <>
                {
                    (lendingOpportunities.length > 0) &&
                    <LendingOpportunities
                        lendingOpportunities={lendingOpportunities}></LendingOpportunities>
                }
            </>;
        } else {
            return <></>
        }
    }

    function PoolingTab() {
        if (tabs.find(element => element.id === 'Pooling' && element.selected === true)) {
            return <>
                {
                    (poolingOpportunities.length > 0) &&
                    <PoolingOpportunities
                        title={poolingOpportunitiesTitle}
                        poolingOpportunities={poolingOpportunities}></PoolingOpportunities>
                }
            </>;
        } else {
            return <></>
        }
    }

    function FarmingTab() {
        if (tabs.find(element => element.id === 'Farming' && element.selected === true)) {
            return (
                <>
                    {
                        (farmingOpportunities.length > 0) &&
                        <FarmingOpportunities
                            farmingOpportunities={farmingOpportunities}></FarmingOpportunities>
                    }
                </>
            )
        } else {
            return <></>
        }
    }


    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }, [])


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
                    </Wrapper>

                    <FarmingTab/>
                    <PoolingTab/>
                    <LendingTab/>
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