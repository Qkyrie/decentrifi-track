import React, {useContext, useEffect} from "react";
import DashboardHeader from "./partials/DashboardHeader";
import AccountBreakdown from "./partials/OverviewDetails";
import BalanceDetails from "./partials/BalanceDetails";

import tw from 'twin.macro';
import DefiPositions from "./partials/DefiPositions";
import DashboardNavbar from "../../components/DashboardNavbar";
import ClaimableTeaser from "./teasers/ClaimableTeaser";
import SuggestionTeaser from "./teasers/SuggestionTeaser";
import {DashboardContext} from "../../App";
import {useAddressStatistics} from "./hooks/useAddressStatistics";

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
        stats
    } = useAddressStatistics(address);

    const {
        setAddress,
        totalClaimables,
        hideSmallValues,
        toggleHideSmallValues,
    } = useContext(DashboardContext);

    useEffect(() => {
        setAddress(address)
    }, [address]);

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
                <Full>
                    <Column>
                        <BalanceDetails/>
                    </Column>
                    <Column>
                        <DefiPositions/>
                    </Column>
                </Full>
                <SuggestionTeaser address={address} amount={stats.suggestionCount}/>

            </DashboardWrapper>
        </Container>
    )
}

