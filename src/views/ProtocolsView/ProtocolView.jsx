import React, {useEffect} from 'react';
import useProtocolViewHooks from "./hooks/protocolview-hooks";
import PoolingOpportunities from "../../components/PoolingOpportunities/PoolingOpportunities";
import LendingOpportunities from "../../components/LendingOpportunities/LendingOpportunities";
import FarmingOpportunities from "../../components/FarmingOpportunities/FarmingOpportunities";
import tw from "twin.macro";
import FallbackImage from "../../components/Image/FallbackImage";
import {Link} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import MyBreadcrumbs from "../../components/MyBreadcrumbs";

const Address = tw.span`hidden lg:block font-bold text-base text-black ml-2`
const Blockie = tw.span`hidden lg:block rounded-xl relative p-2 w-24 `;
const GeneralInfo = tw.div`grid flex items-center mb-3 flex-col lg:flex-row w-full`

const LeftColumn = tw.div` w-full p-4 bg-white`

const AddressInfo = tw.div`flex items-center`
const AddressText = tw.div`flex flex-col`
const Wrapper = tw.div`flex grid justify-items-center flex-wrap lg:flex-nowrap pt-2`;
const CenteredBorder = tw.div`w-full lg:w-2/3 border rounded-xl`
const PortfolioValue = tw.div`lg:justify-items-end justify-items-center grid text-xs w-full`
const PortfolioValueContainer = tw.div`bg-purple-100 shadow p-3 flex-wrap flex rounded-xl w-full lg:w-1/2`
const ValueText = tw.div`text-center text-3xl font-bold`;
const StatisticTitle = tw.span`text-center text-gray-700`
const BreadcrumbContainer = tw.div`lg:w-2/3 w-full flex mb-3 text-gray-700 hover:text-blue-600`
const Statistic = tw.div`w-1/2 lg:w-1/4 flex-col flex`

const NavbarWrapper = tw.div`lg:w-2/3`

export default () => {

    const protocolHooks = useProtocolViewHooks();
    let protocol = protocolHooks.protocol;

    useEffect(() => {
        if (protocol) {
            document.title = `${protocol.name} - Explore - Decentrifi`;
        }
    }, [protocol])

    function LendingTab() {
        if (protocolHooks.tabs.find(element => element.id === 'Lending' && element.selected === true)) {
            return <>
                {
                    (protocolHooks.lendingOpportunities.length > 0) &&
                    <LendingOpportunities
                        lendingOpportunities={protocolHooks.lendingOpportunities}></LendingOpportunities>
                }
            </>;
        } else {
            return <></>
        }
    }

    function PoolingTab() {
        if (protocolHooks.tabs.find(element => element.id === 'Pooling' && element.selected === true)) {
            return <>
                {
                    (protocolHooks.poolingOpportunities.length > 0) &&
                    <PoolingOpportunities
                        isLoading={protocolHooks.poolingMarketsQuery.isLoading}
                        poolingOpportunities={protocolHooks.poolingOpportunities}></PoolingOpportunities>
                }
            </>;
        } else {
            return <></>
        }
    }

    function FarmingTab() {
        if (protocolHooks.tabs.find(element => element.id === 'Farming' && element.selected === true)) {
            return (
                <>
                    {
                        (protocolHooks.farmingOpportunities.length > 0) &&
                        <FarmingOpportunities
                            farmingOpportunities={protocolHooks.farmingOpportunities}></FarmingOpportunities>
                    }
                </>
            )
        } else {
            return <></>
        }
    }

    if (protocol == null) {
        return <></>
    } else {
        return (
            <>

                <Wrapper>
                    <BreadcrumbContainer>
                        <MyBreadcrumbs>
                            <Link underline="hover" color="inherit" href={'/protocols'}>
                                Protocols
                            </Link>
                            <Link underline="hover" color={"inherit"} href={`/protocols/${protocol.slug}`}>
                                {protocol.name}
                            </Link>
                        </MyBreadcrumbs>
                    </BreadcrumbContainer>
                </Wrapper>
                <Wrapper>
                    <CenteredBorder>
                        <LeftColumn>
                            <GeneralInfo>
                                {
                                    <AddressInfo>
                                        <Blockie><FallbackImage src={protocol.logo}/></Blockie>
                                        <AddressText>
                                            <Address>{protocol.name}</Address>
                                        </AddressText>
                                    </AddressInfo>
                                }

                                <PortfolioValue>
                                    <PortfolioValueContainer>
                                        <Statistic>
                                            <StatisticTitle>Networks</StatisticTitle>
                                            <ValueText>{protocolHooks.networks.length}</ValueText>
                                        </Statistic>
                                        <Statistic>
                                            <StatisticTitle>Farms</StatisticTitle>
                                            <ValueText>{protocolHooks.farmingOpportunities.length}</ValueText>
                                        </Statistic>
                                        <Statistic>
                                            <StatisticTitle>Liquidity Pools</StatisticTitle>
                                            <ValueText>{protocolHooks.poolingOpportunities.length}</ValueText>
                                        </Statistic>
                                        <Statistic>
                                            <StatisticTitle>Lending Markets</StatisticTitle>
                                            <ValueText>{protocolHooks.lendingOpportunities.length}</ValueText>
                                        </Statistic>
                                    </PortfolioValueContainer>
                                </PortfolioValue>
                            </GeneralInfo>
                        </LeftColumn>
                    </CenteredBorder>
                </Wrapper>

                <Wrapper>
                    <NavbarWrapper>
                        <Navbar items={
                            protocolHooks.tabs
                        }/>
                    </NavbarWrapper>
                </Wrapper>


                <FarmingTab/>
                <PoolingTab/>
                <LendingTab/>
            </>
        )
    }
};