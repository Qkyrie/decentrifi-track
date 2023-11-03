import {fetchNetworks} from "../../../api/defitrack/networks/networks";
import {useQuery} from "@tanstack/react-query";

export default function useNetworks() {
    const query = useQuery({
        queryKey: ['networks'],
        queryFn: fetchNetworks,
        staleTime: 1000 * 60 * 5,
    })

    return {
        networks: query?.data || []
    }
};