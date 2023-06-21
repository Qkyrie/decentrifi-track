import {useEffect, useState} from "react";
import {fetchBorrowingsV2} from "../../../api/defitrack/borrowing/borrowing";
import useProtocols from "./useProtocols";


export default function useDashboardBorrowingHooks(account, supportsDebt, {
    setTotalScanning,
    setDoneScanning
}) {
    const [borrowings, setBorrowings] = useState([]);
    const {deprecatedProtocols: protocols} = useProtocols();

    function refresh() {
        localStorage.setItem(`borrowing-elements-${account}`, null);
        setBorrowings([]);
        init();
    }

    function init() {
        const loadData = async () => {
            if (protocols.length > 0) {
                if (borrowings == null) {
                    setBorrowings([]);
                }
                setTotalScanning(prevTotalScanning => {
                    return prevTotalScanning + protocols.length
                })
                for (const protocol of protocols) {
                    fetchBorrowingsV2(account, protocol).then(retBorrowings => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        })
                        if (retBorrowings.length > 0) {
                            for (const borrowing of retBorrowings) {
                                setBorrowings(prevState => {
                                    prevState.push(borrowing);
                                    localStorage.setItem(`borrowing-elements-${account}`, JSON.stringify(prevState));
                                    return [...prevState];
                                })
                            }
                        } else {
                            setBorrowings(prevState => {
                                localStorage.setItem(`borrowing-elements-${account}`, JSON.stringify(prevState));
                                return [...prevState];
                            })
                        }
                    }).catch(() => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        })
                        console.log("error trying to fetch borrowing positions");
                    });
                }
            }
        }

        if (supportsDebt && account != null) {
            const savedOne = JSON.parse(localStorage.getItem(`borrowing-elements-${account}`));
            if (savedOne !== null) {
                setBorrowings(savedOne);
            } else {
                setBorrowings([]);
                loadData();
            }
        }
    }

    useEffect(() => {
        init();
    }, [protocols, account])

    return {
        borrowings,
        refresh
    }
};