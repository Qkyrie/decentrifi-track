import {useMemo, useState} from 'react';
import {useDashboardFilterHooks} from "./useDashboardFilterHooks";
import useDashboardWalletHooks from "./useDashboardWalletHooks";
import useDashboardScanningProgressHooks from "./useDashboardScanningProgressHooks";
import useDashboardStakingHooks from "./useDashboardStakingHooks.js";
import useDashboardLendingHooks from "./useDashboardLendingHooks";
import useDashboardClaimableHooks from "./useDashboardClaimableHooks";
import useDashboardBorrowingHooks from "./useDashboardBorrowingHooks";
import useDashboardLPHooks from "./useDashboardLPHooks";
import useEns from "./useEns";


export default function
    useDashboardHooks({
                          supportsBalances = true,
                          supportsDebt = true,
                          supportsLending = true,
                          supportsStaking = true,
                          supportsPooling = true
                      }) {

    const [account, setAccount] = useState(null);

    const useDashboardFilter = useDashboardFilterHooks()

    const {
        balanceElements,
        refresh: refreshWallet
    } = useDashboardWalletHooks(account, supportsBalances);
    const {
        setDoneScanning,
        doneScanning,
        setTotalScanning,
        totalScanning
    } = useDashboardScanningProgressHooks();

    const incrementProgress = () => {
        setDoneScanning((prevState) => {
            return prevState + 1
        });
    }

    const addToTotalScanning = (amount) => {
        setTotalScanning((prevState) => {
            return prevState + amount
        });
    }

    const {
        lps,
        refresh: refreshLps
    } = useDashboardLPHooks(account, supportsPooling, {addToTotalScanning, incrementProgress});

    const {
        stakings,
        refresh: refreshStakings
    } = useDashboardStakingHooks(account, supportsStaking, {addToTotalScanning, incrementProgress});
    const {
        lendings,
        refresh: refreshLendings
    } = useDashboardLendingHooks(account, supportsLending, {setTotalScanning, setDoneScanning});

    const {
        claimables,
        refresh: refreshClaimables,
        loading: claimableLoading
    } = useDashboardClaimableHooks(account, {
        setTotalScanning,
        setDoneScanning
    });
    const {
        borrowings,
        refresh: refreshBorrowings
    } = useDashboardBorrowingHooks(account, supportsDebt, {setTotalScanning, setDoneScanning});

    const {
        ens
    } = useEns(account);

    function totalStaking(protocol) {
        if (stakings == null || stakings.length === 0) {
            return 0.0;
        } else {
            return stakings
                .filter(staking => {
                    return protocol == null || staking.protocol.name === protocol.name
                })
                .map(staking => staking.dollarValue).reduce((a, b) => a + b, 0)
        }
    }

    function totalClaimables(protocol) {
        if (claimables == null || claimables.length === 0) {
            return 0.0;
        } else {
            return claimables
                .filter(claimable => {
                    return protocol == null || claimable.protocol.name === protocol.name
                })
                .map(claimable => claimable.dollarValue).reduce((a, b) => a + b, 0)
        }
    }

    function totalWalletBalance() {
        if (balanceElements == null || balanceElements.length === 0) {
            return 0.0;
        } else {
            return balanceElements
                .map(balanceElement => balanceElement.dollarValue).reduce((a, b) => a + b, 0)
        }
    }

    function totalBalance() {
        return totalWalletBalance() + totalLending() + totalStaking() + totalPooling();
    }

    function totalPooling(protocol) {
        if (lps == null || lps.length === 0) {
            return 0.0
        } else {
            return lps
                .filter(lp => {
                    return protocol == null || lp.protocol.name === protocol.name
                })
                .map(lp => lp.dollarValue)
                .reduce((a, b) => a + b, 0);
        }
    }

    function totalLending(protocol) {
        if (lendings == null || lendings.length === 0) {
            return 0.0;
        } else {
            return lendings
                .filter(lending => {
                    return protocol == null || lending.protocol.name === protocol.name
                })
                .map(lending => lending.dollarValue).reduce((a, b) => a + b, 0)
        }
    }

    function totalBorrowing() {
        if (borrowings == null || borrowings.length === 0) {
            return 0;
        } else {
            return borrowings
                .map(borrowing => borrowing.dollarValue).reduce((a, b) => a + b, 0)
        }
    }

    function getUniqueNetworks() {
        let activeNetworks = lendings
            .map(lending => lending.network).concat(
                borrowings.map(borrowing => borrowing.network)
            ).concat(
                stakings
                    .map(staking => staking.network)
            ).concat(
                balanceElements.map(balanceElement => balanceElement.network)
            ).concat(
                lps
                    .map(lp => lp.network)
            ).concat(
                claimables.map(claimable => claimable.network)
            );

        if (activeNetworks.length > 0) {
            return Array.from(
                new Set(
                    activeNetworks
                        .map(network => network.name)
                        .map(id => {
                            return activeNetworks.find(n => id === n.name)
                        })
                )
            )
        } else {
            return []
        }
    }

    const uniqueProtocols = useMemo(() => {
        const stakingProtocols = stakings.map(staking => staking.protocol)
        const poolingProtocols = lps.map(lp => lp.protocol)
        const claimableProtocols = claimables.map(claimable => claimable.protocol)
        const lendingProtocols = lendings.map(lending => lending.protocol)
        const borrowingProtocols = borrowings.map(borrowing => borrowing.protocol)

        const activeProtocols = stakingProtocols
            .concat(poolingProtocols)
            .concat(claimableProtocols)
            .concat(lendingProtocols)
            .concat(borrowingProtocols)

        const set = Array.from(
            new Set(
                activeProtocols
                    .map(proto => proto.name)
                    .map(id => {
                        return activeProtocols.find(proto => id === proto.name)
                    })
            )
        )

        return set.map(proto => {
            return {
                ...proto,
                totalDollarValue: totalLending(proto) + totalStaking(proto) + totalPooling(proto)
            }
        })
    }, [lps, stakings, borrowings, claimables, lendings])

    function getUniqueProtocols() {
        let activeProtocols = lendings
            .map(lending => lending.protocol)
            // .concat(borrowings.map(borrowing => borrowing.protocol))
            // .concat(stakings.map(staking => staking.protocol))
            // .concat(lps.map(lp => lp.protocol))
            //  .concat(claimables.map(claimable => claimable.protocol))
            .filter(proto => proto != null)

        const set = Array.from(
            new Set(
                activeProtocols
                    .map(proto => proto.name)
                    .map(id => {
                        return activeProtocols.find(proto => id === proto.name)
                    })
            )
        )

        return set.map(proto => {
            return {
                ...proto,
                totalDollarValue: totalLending(proto) + totalStaking(proto) + totalPooling(proto)
            }
        })
    }

    const [searchAddress, setSearchAddress] = useState(null);

    function refresh() {
        refreshWallet();
        refreshStakings();
        refreshClaimables();
        refreshLendings();
        refreshBorrowings();
        refreshLps();
    }

    return {
        ens,
        claimableLoading,
        refresh,
        refreshClaimables,
        searchAddress,
        setSearchAddress: setSearchAddress,
        address: account,
        setAddress: setAccount,
        usedProtocols: uniqueProtocols,
        usedNetworks: getUniqueNetworks(),
        hasFinishedScanning: doneScanning === totalScanning,
        totalScanning: totalScanning,
        doneScanning: doneScanning,
        balanceElements: balanceElements,
        lps: lps,
        lendings: lendings,
        borrowings: borrowings,
        stakings: stakings,
        claimables: claimables,
        totalClaimables: totalClaimables,
        totalWalletBalance: totalWalletBalance(),
        totalBalance: totalBalance(),
        totalStaking: totalStaking(),
        totalStakingForProtocol: totalStaking,
        totalPooling: totalPooling(),
        totalPoolingForProtocol: totalPooling,
        totalLending: totalLending(),
        totalLendingForProtocol: totalLending,
        totalBorrowing: totalBorrowing(),
        totalBorrowingForProtocol: totalBorrowing,
        ...useDashboardFilter
    }
}