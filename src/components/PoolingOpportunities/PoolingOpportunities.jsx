import React, {useEffect, useState} from 'react';
import SearchField from "../Search/SearchField";
import tw from "twin.macro";
import {Button} from "@mui/material";
import AssetTable from "../AssetTable/AssetTable";
import FallbackImage from "../Image/FallbackImage";
import {ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/solid";
import styled from "styled-components"; //eslint-disable-line

const Center = tw.div`w-full grid justify-items-center`
const Container = tw.div`px-4 bg-white shadow-lg rounded-sm border border-gray-200 w-full lg:w-2/3 my-4 py-4`
const Header = tw.div`py-4 border-b border-gray-100 font-semibold text-gray-800`
const NetworkContainer = tw.div``
const ButtonWrapper = tw.span`px-1`

const ButtonIcon = tw.div`w-3 h-3 mr-2`

const Actions = styled.div`
    ${tw`flex`}
    svg {
        ${tw`w-4 h-4`}
    }
`

export default ({poolingOpportunities, title = "Pooling Opportunities"}) => {

    const [searchFilter, setSearchFilter] = useState(null)
    const [networkFilter, setNetworkFilter] = useState([])

    const networks = Array.from(
        new Set(
            poolingOpportunities.map((opportunity) => {
                return opportunity.network.name
            })
        )
    );

    function getLogo(networkName) {
        return poolingOpportunities.find((opportunity) => {
            return opportunity.network.name === networkName
        }).network.logo
    }

    useEffect(() => {
        networks.forEach((network) => {
            setNetworkFilter((prevState) => {
                if (!prevState.includes(network)) {
                    prevState.push(network)
                }
                return [...prevState];
            });
        })
    }, [poolingOpportunities])

    const entries = poolingOpportunities.filter((row) => {
        if (searchFilter && searchFilter.length > 0) {
            return row.name.toLowerCase().includes(searchFilter.toLowerCase()) || row.tokens.filter(t => {
                return t.symbol.toLowerCase().includes(searchFilter.toLowerCase())
            }).length > 0
        } else {
            return true;
        }
    }).filter((row) => {
        return (networkFilter.includes(row.network.name))
    }).sort((row1, row2) => {
        return row2.marketSize - row1.marketSize
    }).map(element => {


        return {
            symbol: null,
            detailUrl: /* `/pooling/${element.network.name}/${element.protocol.slug}/${element.id}` */ null,
            name: <ElementAndBreakdown element={element}/>,
            amount: element.amount,
            apr: element.apr,
            logo: element.protocol.logo,
            networkLogo: element.network.logo,
            dollarValue: element.marketSize,
            actionButton: null
        }
    })
    const search = (e) => {
        setSearchFilter(e.target.value)
    }


    if (poolingOpportunities.length > 0) {
        return (
            <Center>
                <Container>
                    <AssetTable
                        usePagination={true}
                        showPlaceholder={true}
                        entries={entries}
                        header={
                            <>
                                <Header><h2>{title}</h2></Header>
                                <NetworkContainer>
                                    <NetworkButtons networks={networks}/>
                                </NetworkContainer>
                                <Center>
                                    <SearchField onChange={search}/>
                                </Center>
                            </>
                        }
                    />
                </Container>
            </Center>
        );
    } else {
        return <>
        </>
    }
}

function NetworkButtons({networks}) {
    networks.map((network) => {
        return (
            <NetworkButton network={network}/>
        )
    })
}

function NetworkButton({network}) {
    return (
        <ButtonWrapper key={network.slug}>
            <Button onClick={onClick} variant={getVariant()} color={"success"}>
                <ButtonIcon>
                    <FallbackImage src={getLogo(network)}/>
                </ButtonIcon>
                {network}
            </Button>
        </ButtonWrapper>
    )
}

const TokenLabel = styled.span`
    ${tw`bg-gray-200 p-2 mx-1 rounded text-xs`}
    object {
        ${tw`w-4 h-4 inline-block mr-1`}
    }
`
const ElementAndBreakdownHolder = tw.div`w-full flex`
const ElementName = tw.div`w-1/2 self-center`
const ElementBreakdown = tw.div`w-1/2`

function ElementAndBreakdown({element}) {
    const breakdown = (element.breakdown || []).map((breakdownElement, index) => {
        return (
            <TokenLabel key={index}>
                <FallbackImage src={breakdownElement.token.logo}/>
                {breakdownElement.token.symbol}
            </TokenLabel>
        )
    });

    return (
        <ElementAndBreakdownHolder>
            <ElementName>
                {element.name}
            </ElementName>
            <ElementBreakdown>
                {breakdown}
            </ElementBreakdown>
        </ElementAndBreakdownHolder>
    )
}