import {useEffect, useState} from "react";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";
import {useQuery} from "@tanstack/react-query";

export default function useProtocols() {
    const [protocols, setProtocols] = useState([])

    const query = useQuery({
        queryKey: ['protocols'],
        queryFn: async () => {
            const retVal = await fetchProtocols()
            return retVal;
        }
    })

    useEffect(() => {
        async function fetchData() {
            const retVal = await fetchProtocols()
            setProtocols(retVal)
        }

        fetchData();
    }, [])

    return {
        protocols: query.data || [],
        deprecatedProtocols: protocols
    }
};