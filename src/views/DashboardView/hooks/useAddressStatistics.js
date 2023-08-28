import {useQuery} from "@tanstack/react-query";
import {getAccount} from "../../../api/whalespotter/account/account";
import {useMemo} from "react";

export function useAddressStatistics(address) {

    const query = useQuery({
        queryKey: ["whalespotter", "users", address],
        staleTime: 30 * 1000, //every 30 secs
        queryFn: async () => {
            const response = getAccount(address)
            return await response;
        }
    });

    const stats = useMemo(() => {
        return query.data || {
            "address": address,
            "allowanceCount": 0,
            "transactionCount": 0,
            "suggestionCount": 0
        }
    }, [query.data, address])

    return {
        stats,
    }
}