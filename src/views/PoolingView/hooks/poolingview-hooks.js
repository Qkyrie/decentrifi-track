import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchTokenBalance} from "../../../api/defitrack/erc20/erc20";
import {fetchPoolingMarketAlternativesForToken, fetchPoolingMarketById} from "../../../api/defitrack/pools/pools";
import BigNumber from "bignumber.js";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";
import useWeb3 from "../../../hooks/web3";

export default function usePoolingViewHooks() {
    const params = useParams();
    const network = params.network;
    const protocol = params.protocol;
    const stakingId = params.selectedPoolingMarketId;

    const web3 = useWeb3();

    const [activePoolingElement, setActivePoolingElement] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const result = await fetchPoolingMarketById(network, protocol, stakingId);
            setActivePoolingElement(result)
        }

        fetchData();
    }, [])


    const [underlyingTokenBalances, setUnderlyingTokenBalance] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (activePoolingElement !== null && web3.account != null) {

                activePoolingElement.tokens.forEach(token => {

                    let balance;

                    fetchTokenBalance(token.address, web3.account, activePoolingElement.network.name).then(result => {
                        balance = result;
                    }).catch(e => {
                        balance = 0
                    }).finally(() => {
                        setUnderlyingTokenBalance(prevState => {
                            let newitem = {
                                ...token,
                                balance: balance,
                                realDecimalBalance: function () {
                                    let result = new BigNumber(balance).dividedBy(
                                        new BigNumber(10).exponentiatedBy(token.decimals || 18)
                                    );
                                    return result.toFixed(token.decimals || 18, 0);
                                }(),
                                viewableBalance: function () {
                                    let result = new BigNumber(balance).dividedBy(
                                        new BigNumber(10).exponentiatedBy(token.decimals || 18)
                                    );
                                    if (new BigNumber(0.000001).isGreaterThan(result)) {
                                        return "< 0.000001";
                                    } else if (new BigNumber(0).isLessThan(result)) {
                                        return `~ ${result.toFixed(6, 0)}`;
                                    } else {
                                        return "0.0";
                                    }
                                }()
                            };
                            prevState.push(newitem);
                            return [...prevState]
                        })
                    })
                });
            }
        }

        fetchData();
    }, [web3.account, activePoolingElement]);

    const [alternativePoolingMarkets, setAlternativePoolingMarkets] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (activePoolingElement !== null) {
                for (const proto of ((await fetchProtocols()).filter(x => x.dedicatedMicroService === true))) {
                    fetchPoolingMarketAlternativesForToken(
                        network,
                        proto,
                        activePoolingElement.address
                    ).then(result => {
                        for (const element of result) {
                            setAlternativePoolingMarkets((prevState) => {
                                prevState.push(element)
                                return [...prevState]
                            })
                        }
                    });
                }
            }
        }

        fetchData();
    }, [activePoolingElement])

    const [selectedUnderlyingTokenBalance, setSelectedUnderlyingTokenBalance] = useState(null);

    useEffect(() => {
        setSelectedUnderlyingTokenBalance(underlyingTokenBalances[0])
    }, [underlyingTokenBalances])

    return {
        alternativePoolingMarkets: alternativePoolingMarkets,
        underlyingTokenBalances: underlyingTokenBalances,
        network: network,
        activePoolingElement: activePoolingElement,
        selectedUnderlyingTokenBalance: selectedUnderlyingTokenBalance,
        setSelectedUnderlyingTokenBalance: setSelectedUnderlyingTokenBalance
    }
}