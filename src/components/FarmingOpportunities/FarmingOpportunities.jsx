import React, {useEffect, useState} from "react";
import SearchField from "../Search/SearchField";
import tw from 'twin.macro';
import {Button} from "@mui/material";
import AssetTable from "../AssetTable/AssetTable";
import FallbackImage from "../Image/FallbackImage";

const Center = tw.div`w-full grid justify-items-center`
const Container = tw.div`px-4 bg-white shadow-lg rounded-sm border border-gray-200 w-full lg:w-2/3 my-4 py-4`
const Header = tw.div`py-4 border-b border-gray-100 font-semibold text-gray-800`
const NetworkContainer = tw.div``
const ButtonWrapper = tw.span`px-1 items-center`

const ButtonIcon = tw.div`w-3 h-3 mr-2`

export default function FarmingOpportunities({farmingOpportunities}) {

    const [searchFilter, setSearchFilter] = useState(null)
    const [networkFilter, setNetworkFilter] = useState([])

    const networks = Array.from(
        new Set(
            farmingOpportunities.map((opportunity) => {
                return opportunity.network.name
            })
        )
    );

    useEffect(() => {
        networks.forEach((network) => {
            setNetworkFilter((prevState) => {
                if (!prevState.includes(network)) {
                    prevState.push(network)
                }
                return [...prevState];
            });
        })
    }, [farmingOpportunities])

    function getLogo(networkName) {
        return farmingOpportunities.find((opportunity) => {
            return opportunity.network.name === networkName
        }).network.logo
    }


    let opportunities = farmingOpportunities.filter(row => {
        if (searchFilter !== null && searchFilter.length > 0) {
            return row.stakedToken.name.toLowerCase().includes(searchFilter.toString().toLowerCase());
        } else {
            return true;
        }
    }).filter((row) => {
        return (networkFilter.includes(row.network.name))
    }).sort((row1, row2) => {
        return row2.marketSize - row1.marketSize
    });

    const entries = opportunities.map(element => {
        return {
            symbol: element.stakedToken.symbol,
            detailUrl: /*`/staking/${element.network.name}/${element.protocol.slug}/${element.id}` */ null,
            name: element.name,
            amount: element.amount,
            apr: element.apr,
            logo: element.protocol.logo,
            networkLogo: element.network.logo,
            dollarValue: element.marketSize,
        }
    })


    const search = (e) => {
        setSearchFilter(e.target.value)
    }

    return (
        <>
            <Center>
                <Container>
                    <AssetTable
                        usePagination={true}
                        showPlaceholder={true}
                        entries={entries}
                        header={
                            <>
                                <Header>Farming Opportunities</Header>
                                <NetworkContainer>
                                    <NetworkButtons networks={networks}/>
                                </NetworkContainer>
                                <Center>
                                    <SearchField onChange={search} onClick={e => console.log(e)}/>
                                </Center>
                            </>
                        }
                    />
                </Container>
            </Center>
        </>
    );
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