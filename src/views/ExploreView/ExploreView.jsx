import tw from "twin.macro";
import CustomHeader from "../../components/Header/CustomHeader";
import React, {useEffect, useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {getStatisticsPerProtocol} from "../../api/defitrack/statistics/Statistics";
import {ProtocolCard} from "./ProtocolCard";
import ExploreSearchTeaser from "./components/ExploreSearchTeaser";
import ReactGA from "react-ga4";

const Container = tw.div`flex grid w-full`
const Center = tw.div`flex grid justify-items-center mb-1`
const Heading = tw.h2`lg:w-3/4 font-bold  text-2xl ml-4 w-full text-gray-900 font-display leading-tight`
const Highlight = tw.span`text-purple-700`

const ProtocolsContainer = tw.div`flex lg:w-3/4 flex-wrap w-full`

export default function () {

    useEffect(() => {
        window.title = 'Decentrifi Portfolio | Explore DeFi Protocols and Accounts';
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }, []);


    return <>
        <CustomHeader showSearch={false}></CustomHeader>
        <Container>
            <ExploreSearchTeaser/>
        </Container>
    </>

};