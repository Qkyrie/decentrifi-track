import tw from "twin.macro";
import CustomHeader from "../../components/Header/CustomHeader";
import React, {useEffect, useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {getStatisticsPerProtocol} from "../../api/defitrack/statistics/Statistics";
import {ProtocolCard} from "./ProtocolCard";
import ExploreSearchTeaser from "./components/ExploreSearchTeaser";

const Container = tw.div`flex grid w-full`
const Center = tw.div`flex grid justify-items-center mb-1`
const Heading = tw.h2`lg:w-3/4 font-bold  text-2xl ml-4 w-full text-gray-900 font-display leading-tight`
const Highlight = tw.span`text-purple-700`

const ProtocolsContainer = tw.div`flex lg:w-3/4 flex-wrap w-full`

export default function () {

    useEffect(() => {
        window.title = 'Decentrifi Connect | Explore DeFi Protocols and Accounts';
    }, []);


    async function fetchStatistics() {
        return await getStatisticsPerProtocol();
    }

    const protocolQuery = useQuery({
        queryKey: ["protocol-stats"],
        queryFn: async () => {
            return await fetchStatistics();
        }
    })

    const protocols = useMemo(() =>  {
        return protocolQuery.data?.sort(() => 0.5 - Math.random()).map((stat) => {
            return (
                <ProtocolCard stat={stat} key={stat.protocol.slug}/>
            )
        }).slice(0, 12)
    }, [protocolQuery.data])

    return <>
        <CustomHeader showSearch={false}></CustomHeader>
        <Container>
            <ExploreSearchTeaser/>
        </Container>
        <Container>
            <Center>
                <Heading>Explore <Highlight>Protocols</Highlight></Heading>

                <ProtocolsContainer>
                    {protocols}
                </ProtocolsContainer>
            </Center>
        </Container>
    </>

};