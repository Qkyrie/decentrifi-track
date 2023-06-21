import {useEffect, useState} from "react";
import {lendingPositions} from "../../../api/defitrack/lending/lending";
import useProtocols from "./useProtocols";

export default function useDashboardLendingHooks(account, supportsLending, {
    setTotalScanning,
    setDoneScanning
}) {
    const [lendings, setLendings] = useState([]);
    const {deprecatedProtocols: protocols} = useProtocols();

    function refresh() {
        localStorage.setItem(`lending-elements-${account}`, null);
        setLendings([]);
        init();
    }

    function init() {
        const loadData = async () => {
            if (protocols.length > 0) {
                setTotalScanning(prevTotalScanning => {
                    return prevTotalScanning + protocols.length
                })
                for (const protocol of protocols) {
                    lendingPositions(account, protocol).then(retLendings => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        })
                        if (retLendings.length > 0) {
                            for (const lending of retLendings) {
                                setLendings(prevState => {
                                    prevState.push(lending);
                                    localStorage.setItem(`lending-elements-${account}`, JSON.stringify(prevState));
                                    return [...prevState];
                                })
                            }
                        } else {
                            setLendings(prevState => {
                                localStorage.setItem(`lending-elements-${account}`, JSON.stringify(prevState));
                                return [...prevState];
                            })
                        }
                    }).catch(() => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        })
                        console.log("error trying to fetch lending positions");
                    });
                }
            }
        }

        if (supportsLending && account !== undefined) {
            const savedOne = JSON.parse(localStorage.getItem(`lending-elements-${account}`))
            if (savedOne !== null) {
                setLendings(savedOne);
            } else {
                setLendings([]);
                loadData();
            }
        }
    }

    useEffect(() => {
        init();
    }, [protocols, account])

    return {
        lendings,
        refresh
    }
};