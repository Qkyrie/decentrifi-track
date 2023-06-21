import React, {useEffect, useState} from 'react';

export default function useLendingPageHooks() {

    const networks = ['ETHEREUM', 'POLYGON'];
    const [lendingMarketElements, setLendingMarketElements] = useState([])

    // useEffect(() => {
    //     const loadData = async () => {
    //         for (const network of networks) {
    //             const result = await fetchLendingMarkets(network)
    //             if (result.length > 0) {
    //                 for (const element of result) {
    //                     setLendingMarketElements(prevState => {
    //                         prevState.push(element);
    //                         return [...prevState]
    //                     })
    //                 }
    //             }
    //         }
    //     }
    //     loadData();
    // }, []);


    const [selectedNetwork, setSelectedNetwork] = useState('ETHEREUM')

    const [searchFilter, setSearchFilter] = useState(null)

    function getFilteredLendingMarkets() {
        return lendingMarketElements
            .filter(market => {
                return market.network.name === selectedNetwork
            })
            .filter(market => {
                if (searchFilter == null) {
                    return true
                } else {
                    return market.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        market.token.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        market.token.symbol.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        market.protocol.name.toLowerCase().includes(searchFilter.toLowerCase())
                }
            })
    }

    return {
        lendingMarkets: getFilteredLendingMarkets,
        setSearchFilter: setSearchFilter,
        selectedNetwork: selectedNetwork,
        setSelectedNetwork: setSelectedNetwork
    }
};