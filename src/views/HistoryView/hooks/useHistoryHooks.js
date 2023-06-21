import {useEffect} from "react";
import {getEvents} from "../../../api/whalespotter/transactions/transactions";
import {useQuery} from "@tanstack/react-query";

export default function (address) {

    const eventsQuery = useQuery({
        queryKey: ['account', address, 'events'],
        queryFn: async () => {
            return getEvents(address)
        }
    })

    useEffect(async () => {
        document.title = `History for ${address} - Decentrifi`;
    }, []);


    return {
        loading: eventsQuery.isLoading,
        events: eventsQuery.data?.content
    }
};