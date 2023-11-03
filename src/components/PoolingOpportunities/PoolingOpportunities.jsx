import React, {useEffect, useState} from 'react';
import SearchField from "../Search/SearchField";
import tw from "twin.macro";
import {Button} from "@mui/material";
import AssetTable from "../AssetTable/AssetTable";
import FallbackImage from "../Image/FallbackImage";

const Center = tw.div`w-full grid justify-items-center`
const Container = tw.div`px-4 bg-white shadow-lg rounded-sm border border-gray-200 w-full lg:w-2/3 my-4 py-4`
const Header = tw.div`py-4 border-b border-gray-100 font-semibold text-gray-800`
const NetworkContainer = tw.div``
const ButtonWrapper = tw.span`px-1`

const ButtonIcon = tw.div`w-3 h-3 mr-2`

export default ({poolingOpportunities, title = "Pooling Opportunities", isLoading = true}) => {

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

    const networkButtons = networks.map((network) => {
        const onClick = () => {
            setNetworkFilter((prevState) => {
                if (prevState.includes(network)) {
                    return [...prevState.filter(x => x !== network)]
                } else {
                    prevState.push(network);
                    return [...prevState];
                }
            });
        }

        const getVariant = () => {
            return networkFilter.includes(network) ? "contained" : "outlined"
        }

        return (
            <ButtonWrapper>
                <Button onClick={onClick} variant={getVariant()} color={"success"}>
                    <ButtonIcon>
                        <FallbackImage src={getLogo(network)}/>
                    </ButtonIcon>
                    {network}
                </Button>
            </ButtonWrapper>
        );
    })

    const entries = poolingOpportunities.filter((row) => {
        if (searchFilter && searchFilter.length > 0) {
            return row.tokens.filter(t => {
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
            symbol: element.symbol,
            detailUrl: /* `/pooling/${element.network.name}/${element.protocol.slug}/${element.id}` */ null,
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


    if (poolingOpportunities.length > 0) {
        return (
            <Center>
                <Container>
                    <AssetTable
                        usePagination={true}
                        showPlaceholder={true}
                        entries={entries}
                        isLoading={isLoading}
                        header={
                            <>
                                <Header><h2>{title}</h2></Header>
                                <NetworkContainer>{networkButtons}</NetworkContainer>
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