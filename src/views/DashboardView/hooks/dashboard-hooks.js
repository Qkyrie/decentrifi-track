import {useState} from 'react';
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
    useDashboardHooks(account, {
    supportsBalances = true,
    supportsDebt = true,
    supportsLending = true,
    supportsStaking = true,
    supportsPooling = true
}) {

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
                .filter(smallValueFilter)
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
                .filter(smallValueFilter)
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
                .filter(smallValueFilter)
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
                .filter(smallValueFilter)
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

    function getUniqueProtocols() {
        let activeProtocols = lendings
            .filter(smallValueFilter)
            .map(lending => lending.protocol)
            .concat(
                borrowings.map(borrowing => borrowing.protocol)
            ).concat(
                stakings
                    .filter(smallValueFilter)
                    .map(staking => staking.protocol)
            ).concat(
                lps
                    .filter(smallValueFilter)
                    .map(lp => lp.protocol)
            ).concat(
                claimables.map(claimable => claimable.protocol)
            ).filter(proto => proto != null)

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

    let smallValueFilter = element => {
        if (useDashboardFilter.hideSmallValues) {
            return element.dollarValue > 0.01
        } else {
            return true;
        }
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
        usedProtocols: getUniqueProtocols(),
        usedNetworks: getUniqueNetworks(),
        hasFinishedScanning: doneScanning === totalScanning,
        totalScanning: totalScanning,
        doneScanning: doneScanning,
        balanceElements: balanceElements.filter(smallValueFilter),
        lps: lps.filter(smallValueFilter),
        lendings: lendings.filter(smallValueFilter),
        borrowings: borrowings.filter(smallValueFilter),
        stakings: stakings.filter(smallValueFilter),
        claimables: claimables,
        totalClaimables: totalClaimables(),
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