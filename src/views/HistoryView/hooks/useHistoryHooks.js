import {useEffect} from "react";
import {getEvents} from "../../../api/whalespotter/transactions/transactions";
import {useQuery} from "@tanstack/react-query";

export default function (address) {

    const eventsQuery = useQuery({
        queryKey: ['account', address, 'events'],
        queryFn: async () => {
            return getEvents(address)
        },
        staleTime: 1000 * 60 * 3,
    })

    useEffect(() => {
        document.title = `History for ${address} - Decentrifi`;
    }, [address]);

    return {
        loading: eventsQuery.isLoading,
        events: eventsQuery.data?.content
    }
};