import {fetchAllClaimables} from "../../../api/defitrack/claimable/claimable";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import useProtocols from "./useProtocols";

export default function useDashboardClaimableHooks(account) {
    const queryClient = useQueryClient();
    const {protocols} = useProtocols();

    function doQuery() {
        return async () => {
            return fetchAllClaimables(account)
        };
    }

    const query = useQuery({
            queryKey: ["claimables", account],
            queryFn: doQuery(),
            enabled: !!account
        }
    );


    const refresh = () => {
        protocols.forEach(async (protocol) => {
            await queryClient.invalidateQueries(['claimables', account]);
            await queryClient.prefetchQuery(
                {
                    queryKey: ['claimables', account],
                    queryFn: doQuery(),
                }
            )
        });
    }

    return {
        claimables: query.data || [],
        refresh: refresh,
        loading: query.isLoading,
    }
}