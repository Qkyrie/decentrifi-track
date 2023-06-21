import {useEffect, useState} from "react";
import {fetchNativeBalance, fetchTokenBalance} from "../../../api/defitrack/balance/balance";
import useNetworks from "./useNetworks";

export default function useDashboardWalletHooks(account, supportsBalances) {
    const [balanceElements, setBalanceElements] = useState([]);

    const {networks} = useNetworks();

    function refresh() {
        localStorage.setItem(`balance-elements-${account}`, null);
        setBalanceElements([]);
        init(account);
    }

    function init(_account) {
        if (supportsBalances && _account != null && networks != null && networks.length > 0) {
            const savedOne = JSON.parse(localStorage.getItem(`balance-elements-${_account}`));
            if (savedOne != null) {
                setBalanceElements(savedOne)
            } else {
                setBalanceElements([]);
                fetchNativeBalance(_account).then(nativeBalance => {
                    for (const balanceElement of nativeBalance) {
                        setBalanceElements(prevState => {
                            prevState.push({
                                ...balanceElement,
                                owner: _account
                            });
                            localStorage.setItem(`balance-elements-${_account}`, JSON.stringify(prevState));
                            return [...prevState];
                        })
                    }
                });
                for (const network of networks) {
                    fetchTokenBalance(_account, network.name).then(tokenBalance => {
                        if (tokenBalance.length > 0) {
                            for (const balanceElement of tokenBalance) {
                                setBalanceElements(prevState => {
                                    prevState.push({
                                        ...balanceElement,
                                        owner: _account
                                    });
                                    localStorage.setItem(`balance-elements-${_account}`, JSON.stringify(prevState));
                                    return [...prevState];
                                })
                            }
                        } else {
                            setBalanceElements(prevState => {

                                localStorage.setItem(`balance-elements-${_account}`, JSON.stringify(prevState));
                                return prevState
                            })
                        }
                    }).catch(ex => {
                        console.log(`error trying to fetch token balances for network ${network.name}`)
                    });
                }
            }
        }
    }

    useEffect(() => {
        init(account);
    }, [account, networks])

    const filteredBalanceElements = () => {
        if (balanceElements == null || balanceElements.length === 0) {
            return [];
        } else {
            return balanceElements.filter(balance => balance.owner === account);
        }
    }

    return {
        balanceElements: filteredBalanceElements().sort((a, b) => {
            return b.dollarValue - a.dollarValue
        }),
        refresh
    }
};