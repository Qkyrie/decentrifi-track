import {useEffect, useState} from "react";
import {fetchNativeBalance, fetchTokenBalance} from "../../../api/defitrack/balance/balance";
import useNetworks from "./useNetworks";
import {signal} from "@preact/signals-react";
import {useQuery} from "@tanstack/react-query";

export default function useDashboardWalletHooks(account, supportsBalances) {


    const {networks} = useNetworks();

    const balanceQuery = useQuery({
        queryKey: ['balances', account],
        queryFn: () => {

            const result = new ResultHolder();
            fetchNativeBalance(account).then(nativeBalance => {
                for (const balanceElement of nativeBalance) {
                    result.push({
                        ...balanceElement,
                        owner: account
                    });
                }
            });

            for (const network of networks) {
                fetchTokenBalance(account, network.name).then(tokenBalance => {
                    if (tokenBalance.length > 0) {
                        for (const balanceElement of tokenBalance) {
                            result.push({
                                ...balanceElement,
                                owner: account
                            })
                        }
                    }
                }).catch(ex => {
                    console.log(`error trying to fetch token balances for network ${network.name}`)
                });
            }
            return result;
        },
        staleTime: 1000 * 60 * 5,
        enabled: supportsBalances && account != null && networks != null && networks.length > 0
    });

    function refresh() {
        balanceQuery.refetch();
    }

    const filteredBalanceElements = () => {
        if (balanceQuery?.data?.results == null || balanceQuery?.data?.results?.length === 0) {
            return [];
        } else {
            return balanceQuery?.data?.results.filter(balance => balance.owner === account);
        }
    }

    class ResultHolder {
        results = []

        push(element) {
            this.results.push(element);
        }
    }

    return {
        balanceElements: filteredBalanceElements().sort((a, b) => {
            return b.dollarValue - a.dollarValue
        }),
        refresh
    }
};