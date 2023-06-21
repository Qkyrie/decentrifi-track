import {fetchNetworks} from "../../../api/defitrack/networks/networks";
import {useEffect, useState} from "react";

export default function useNetworks() {
    const [networks, setNetworks] = useState([])

    useEffect(() => {
        async function fetchData() {
            const retVal = await fetchNetworks()
            setNetworks(retVal)
        }

        fetchData();
    }, [])

    return {
        networks
    }
};