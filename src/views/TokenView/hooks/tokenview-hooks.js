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
import {useQuery, useQueryClient} from "@tanstack/react-query";
import Big from "big.js";

export default function useTokenviewHooks(networkName, tokenAddress) {

    const queryClient = useQueryClient();

    const tokenQuery = useQuery({
        queryKey: ['tokens', networkName, tokenAddress],
        queryFn: async () => {
            const tokenInfoResponse = await fetchTokenInformation(tokenAddress, networkName)
            const dollarValue = await calculatePrice({
                address: tokenInfoResponse.address,
                network: networkName,
                amount: 1.0
            })
            return {
                ...tokenInfoResponse,
                dollarValue: dollarValue
            };
        },
        staleTime: 1000 * 60 * 3,
    })

    const token = tokenQuery.data;

    const web3 = useWeb3();

    function doQuery() {
        return async () => {
            const result = await (async () => {
                if (token.address === "0x0") {
                    return await fetchTokenBalance(token.address, web3.account, networkName);
                } else {
                    return await fetchTokenBalance(token.address, web3.account, networkName);
                }
            })()
            if (result > 0) {
                try {
                    console.log("test", BigNumber.from("879404191289884246"))
                    console.log('result', result)
                    const number = Big(result.toString())
                    console.log(number.toString());
                    return number.div(Big(10).pow(token.decimals)).toFixed(token.decimals)
                } catch (ex) {
                    console.log(ex)
                    return 0.00
                }
            } else {
                return 0;
            }
        };
    }

    const userBalanceQuery = useQuery({
        queryKey: ['tokens', networkName, tokenAddress, web3.account],
        queryFn: doQuery(),
        enabled: !!token && web3.hasAccount,
        staleTime: 1000 * 60 * 3,
    });

    async function refresh() {
        await queryClient.invalidateQueries(['tokens', networkName, tokenAddress, web3.account]);
        await queryClient.prefetchQuery(
            {
                queryKey: ['tokens', networkName, tokenAddress, web3.account],
                queryFn: doQuery(),
            }
        )
    }

    return {
        userBalance: userBalanceQuery.data || 0,
        token: tokenQuery.data,
        network: networkName,
        refresh,
    }
}