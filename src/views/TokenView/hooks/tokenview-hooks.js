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
        enabled: !!token && web3.hasAccount,
        staleTime: 1000 * 60 * 3,
    });

    return {
        userBalance: userBalanceQuery.data || 0,
        token: tokenQuery.data,
        network: networkName,
    }
}