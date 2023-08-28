import {fetchClaimables} from "../../../api/defitrack/claimable/claimable";
import {useQueries, useQueryClient} from "@tanstack/react-query";
import useProtocols from "./useProtocols";
import {useMemo} from "react";

export default function useDashboardClaimableHooks(account) {
    const queryClient = useQueryClient();
    const {protocols} = useProtocols();

    async function getClaimables(protocol) {
        return (await fetchClaimables(account, protocol)).map(claimable => {
            return {
                ...claimable,
                owner: account
            }
        });
    }

    function query(protocol) {
        return async () => {
            return await getClaimables(protocol);
        };
    }

    const queries = useQueries({
        queries: protocols.map((protocol) => {
            return {
                queryKey: ['claimables', account, protocol],
                staleTime: 1000 * 60 * 3,
                queryFn: query(protocol),
                enabled: !!account
            }
        }),
    });


    const refresh = () => {
        protocols.forEach(async (protocol) => {
            await queryClient.invalidateQueries(['claimables', account, protocol]);
            await queryClient.prefetchQuery(
                {
                    queryKey: ['claimables', account, protocol],
                    queryFn: query(protocol),
                }
            )
        });
    }

    const fetchedClaimables = queries.map((query) => {
            return query.data
        }).filter(data => {
            return data != null
        }).flat();

    return {
        claimables: [...fetchedClaimables.reduce((a, c) => {
            a.set(c.id, c);
            return a;
        }, new Map()).values()].filter(claimable => claimable.owner === account),
        refresh: refresh,
        loading: queries.map(query => query.isLoading).reduce((a, c) => a || c, false),
    }
}