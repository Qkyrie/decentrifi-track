import React, {useEffect} from "react";
import DashboardHeader from "./partials/DashboardHeader";
import AccountBreakdown from "./partials/OverviewDetails";
import BalanceDetails from "./partials/BalanceDetails";

import tw from 'twin.macro';
import DefiPositions from "./partials/DefiPositions";
import DashboardNavbar from "../../components/DashboardNavbar";
import ClaimableTeaser from "./teasers/ClaimableTeaser";
import {DashboardContext} from "../../App";
import useDashboardHooks from "./hooks/dashboard-hooks";
import SuggestionTeaser from "./teasers/SuggestionTeaser";
import useSuggestionHooks from "../SuggestionView/hooks/useSuggestionHooks";

const Container = tw.div`flex pt-5 grid`
const DashboardWrapper = tw.div`w-full`
const HorizontalCenter = tw.div`pl-1 flex items-center w-full`
const HideSmallValueFilter = tw.p`text-xs`

const Full = tw.div`flex flex-wrap w-full`;
const Column = tw.div`w-full lg:w-1/2 px-4`

const CenterText = tw.div`text-center w-full`
const Center = tw.div`w-full flex grid justify-items-center mt-3 mb-1`
export default function DashboardView({address}) {

    const dashboardHooks = useDashboardHooks(address, {});

    const suggestions = useSuggestionHooks(address);

    useEffect(async () => {
        window.title = 'Decentrifi Connect | Explore DeFi Protocols and Accounts';
    }, []);

    function showSmallValues() {
        dashboardHooks.setHideSmallValues(false);
    }

    function hideSmallValues() {
        dashboardHooks.setHideSmallValues(true);
    }

    useEffect(() => {
        document.title = `Profile for ${address} - Decentrifi`
    }, [])


    return (
        <DashboardContext.Provider value={dashboardHooks}>
            <Container>
                <DashboardWrapper>
                    <Center>
                        <DashboardNavbar address={address} selected={"profile"}/>
                    </Center>

                    <DashboardHeader/>

                    <ClaimableTeaser address={dashboardHooks.address} amount={dashboardHooks.totalClaimables}/>
                    <SuggestionTeaser address={dashboardHooks.address} amount={suggestions.suggestions.length}/>
                    <Full>
                        <Column>

                            <BalanceDetails/>

                            <HorizontalCenter>
                                <CenterText>
                                    {
                                        dashboardHooks.hideSmallValues &&
                                        <HideSmallValueFilter>Positions with small deposits are not displayed
                                            (&lt;$0.01). <u><a
                                                onClick={showSmallValues}>show
                                                everything</a></u></HideSmallValueFilter>
                                    }

                                    {
                                        !dashboardHooks.hideSmallValues &&
                                        <HideSmallValueFilter>Positions with small deposits are included
                                            (&lt;$0.01). <u><a
                                                onClick={hideSmallValues}>hide
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
        </DashboardContext.Provider>
    )
}

