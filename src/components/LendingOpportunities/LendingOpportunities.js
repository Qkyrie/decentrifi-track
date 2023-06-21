import React, {useEffect, useState} from 'react';
import tw from 'twin.macro';
import AssetTable from "../AssetTable/AssetTable";
import SearchField from "../Search/SearchField";
import {Button} from "@mui/material";


const Center = tw.div`w-full grid justify-items-center`
const Container = tw.div`px-4 bg-white shadow-lg rounded-sm border border-gray-200 w-full lg:w-2/3 my-4 py-4`
const Header = tw.div`py-4 border-b border-gray-100 font-semibold text-gray-800`
const NetworkContainer = tw.div``
const ButtonWrapper = tw.span`px-1`

export default function LendingOpportunities({lendingOpportunities}) {
    const [searchFilter, setSearchFilter] = useState(null)
    const [networkFilter, setNetworkFilter] = useState([])
    const networks = Array.from(
        new Set(
            lendingOpportunities.map((opportunity) => {
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
    }, [lendingOpportunities])

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
                <Button onClick={onClick} variant={getVariant()} color={"success"}>{network}</Button>
            </ButtonWrapper>
        )
    })

    let opportunities = lendingOpportunities.filter(row => {
        if (searchFilter !== null && searchFilter.length > 0) {
            return row.name.toLowerCase().includes(searchFilter.toString().toLowerCase());
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
            symbol: element.symbol,
            detailUrl: null,
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
        <Center>
            <Container>
                <AssetTable
                    usePagination={true}
                    showPlaceholder={true}
                    entries={entries}
                    header={
                        <>
                            <Header><h2>Lending Opportunities</h2></Header>
                            <NetworkContainer>{networkButtons}</NetworkContainer>
                            <Center>
                                <SearchField onChange={search} onClick={e => console.log(e)}/>
                            </Center>
                        </>
                    }
                />
            </Container>
        </Center>
    )
}