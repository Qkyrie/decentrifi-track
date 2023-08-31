import {useMemo, useState} from "react";
import {fetchTokenBalance, fetchTokenInformation, fetchWrappedToken} from "../../../api/defitrack/erc20/erc20";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";
import {fetchPoolingMarketAlternativesForToken, fetchPoolingMarketsForToken} from "../../../api/defitrack/pools/pools";
import useWeb3 from "../../../hooks/web3";
import {ethers} from 'ethers';
import {BigNumber} from "@ethersproject/bignumber";
import {calculatePrice} from "../../../api/defitrack/price/price";
import {fetchLendingMarketsForToken} from "../../../api/defitrack/lending/lending";
import {fetchStakingMarketsForToken} from "../../../api/defitrack/staking/staking";
import {useQuery} from "@tanstack/react-query";

export default function useTokenviewHooks(networkName, tokenAddress) {

    const tokenQuery = useQuery({
        queryKey: ['tokens', networkName, tokenAddress],
        queryFn: async () => {
            const usingAddress = tokenAddress === '0x0' ? (await fetchWrappedToken(networkName)).address : tokenAddress
            const tokenInfoResponse = await fetchTokenInformation(usingAddress, networkName)
            const dollarValue = await calculatePrice({
                address: tokenInfoResponse.address,
                network: networkName,
                amount: 1.0,
                tokenType: tokenInfoResponse.type
            })
            return {
                ...tokenInfoResponse,
                dollarValue: dollarValue
            };
        }
    })

    const token = tokenQuery.data;


    const web3 = useWeb3();

    const userBalanceQuery = useQuery({
        queryKey: ['tokens', networkName, tokenAddress, web3.account],
        queryFn: async () => {
            const result = await fetchTokenBalance(token.address, web3.account, networkName);
            if (result > 0) {
                const number = BigNumber.from(String(result))
                return ethers.utils.formatUnits(number, token.decimals)
            } else {
                return 0;
            }
        },
        enabled: !!token && web3.hasAccount
    });

    const poolingOpportunitiesQuery = useQuery({
        queryKey: ['tokens', networkName, tokenAddress, 'pooling-markets'],
        queryFn: async () => {
            const result = [];
            let protocols = (await fetchProtocols()).filter((proto) => {
                return proto.primitives.includes('POOLING');
            });
            for (const proto of protocols) {
                let markets = token.type === 'SINGLE' ? await fetchPoolingMarketsForToken(
                    networkName,
                    proto,
                    token.address
                ) : await fetchPoolingMarketAlternativesForToken(
                    networkName,
                    proto,
                    token.address
                );
                result.push(...markets);
            }

            return result;
        },
        enabled: !!token
    });

    const lendingOpportunitiesQuery = useQuery({
        queryKey: ['tokens', networkName, tokenAddress, 'lending-markets'],
        queryFn: async () => {
            const result = [];
            let protocols = (await fetchProtocols()).filter(proto => proto.primitives.includes('LENDING'));
            for (const proto of protocols) {
                let markets = await fetchLendingMarketsForToken(
                    networkName,
                    token.address,
                    proto,
                )
                result.push(...markets);
            }

            return result;
        },
        enabled: !!token && token.type === 'SINGLE'
    });

    const [activeTab, setActiveTab] = useState('Pooling');

    const farmingOpportunitiesQuery = useQuery({
        queryKey: ['tokens', networkName, tokenAddress, 'farming-markets'],
        queryFn: async () => {
            const result = [];
            let protocols = (await fetchProtocols()).filter(proto => proto.primitives.includes('FARMING'));
            for (const proto of protocols) {
                let markets = await fetchStakingMarketsForToken(
                    networkName,
                    proto,
                    token.address,
                )
                result.push(...markets);
            }

            return result;
        },
        enabled: !!token
    });


    const tabs = useMemo(() => {
        function updateActiveTab(tabName) {
            const t = tabs.find((tab) => tab.id === tabName);
            setActiveTab(t.id)
        }

        let t = [];
        if ((poolingOpportunitiesQuery.data || []).length > 0) {
            t.push({
                id: 'Pooling',
                name: `Pooling (${poolingOpportunitiesQuery.data.length})`, selected: true,
                onClick: () => updateActiveTab('Pooling')
            });
        }
        if ((lendingOpportunitiesQuery.data || []).length > 0) {
            t.push({
                id: `Lending`,
                name: `Lending (${lendingOpportunitiesQuery.data.length})`, onClick: (() => {
                    updateActiveTab('Lending')
                })
            });
        }
        if ((farmingOpportunitiesQuery.data || [].length) > 0) {
            t.push({
                id: 'Farming',
                name: `Farming (${farmingOpportunitiesQuery.data.length})`, onClick: (() => {
                    updateActiveTab('Farming')
                })
            });
        }

        if (t.length > 0) {
            t[0].selected = true;
        }
        return t;
    }, [
        farmingOpportunitiesQuery.data,
        lendingOpportunitiesQuery.data,
        poolingOpportunitiesQuery.data,
    ]);

    return {
        tabs: (tabs || []).map((tab) => {
            if (tab.id === activeTab) {
                return {...tab, selected: true}
            } else {
                return {...tab, selected: false}
            }
        }),
        userBalance: userBalanceQuery.data || 0,
        poolingOpportunities: poolingOpportunitiesQuery.data || [],
        farmingOpportunities: farmingOpportunitiesQuery.data || [],
        lendingOpportunities: lendingOpportunitiesQuery.data || [],
        token: tokenQuery.data,
        network: networkName,
    }
}