import React, {useContext, useEffect} from "react";
import DashboardHeader from "./partials/DashboardHeader";
import AccountBreakdown from "./partials/OverviewDetails";
import BalanceDetails from "./partials/BalanceDetails";

import tw from 'twin.macro';
import DefiPositions from "./partials/DefiPositions";
import DashboardNavbar from "../../components/DashboardNavbar";
import ClaimableTeaser from "./teasers/ClaimableTeaser";
import SuggestionTeaser from "./teasers/SuggestionTeaser";
import useSuggestionHooks from "../SuggestionView/hooks/useSuggestionHooks";
import {DashboardContext} from "../../App";

const Container = tw.div`flex pt-5 grid`
const DashboardWrapper = tw.div`w-full`
const HorizontalCenter = tw.div`pl-1 flex items-center w-full`
const HideSmallValueFilter = tw.p`text-xs`

const Full = tw.div`flex flex-wrap w-full`;
const Column = tw.div`w-full lg:w-1/2 px-4`

const CenterText = tw.div`text-center w-full`
const Center = tw.div`w-full flex grid justify-items-center mt-3 mb-1`
export default function DashboardView({address}) {

    const {
        setAddress,
        totalClaimables,
        hideSmallValues,
        toggleHideSmallValues,
    } = useContext(DashboardContext);

    useEffect(() => {
        setAddress(address)
    }, [address]);

    const suggestions = useSuggestionHooks(address);

    useEffect(async () => {
        window.title = 'Decentrifi Connect | Explore DeFi Protocols and Accounts';
    }, []);

    useEffect(() => {
        document.title = `Profile for ${address} - Decentrifi`
    }, [])


    return (
        <Container>
            <DashboardWrapper>
                <Center>
                    <DashboardNavbar address={address} selected={"profile"}/>
                </Center>

                <DashboardHeader/>

                <ClaimableTeaser address={address} amount={totalClaimables}/>
                <SuggestionTeaser address={address} amount={suggestions.suggestions.length}/>
                <Full>
                    <Column>

                        <BalanceDetails/>

                        <HorizontalCenter>
                            <CenterText>
                                {
                                    hideSmallValues &&
                                    <HideSmallValueFilter>Positions with small deposits are not displayed
                                        (&lt;$0.01). <u><a
                                            onClick={toggleHideSmallValues}>show
                                            everything</a></u></HideSmallValueFilter>
                                }

                                {
                                    !hideSmallValues &&
                                    <HideSmallValueFilter>Positions with small deposits are included
                                        (&lt;$0.01). <u><a
                                            onClick={toggleHideSmallValues}>hide
                                            small values</a></u></HideSmallValueFilter>
                                }
                            </CenterText>
                        </HorizontalCenter>
                    </Column>
                    <Column>
                        <AccountBreakdown/>
                        <DefiPositions/>
                    </Column>
                </Full>
            </DashboardWrapper>
        </Container>
    )
}

