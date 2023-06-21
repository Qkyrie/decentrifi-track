import {farmingPositions} from "../../../api/defitrack/staking/staking";
import useProtocols from "./useProtocols";
import {useQuery} from "@tanstack/react-query";

export default function useDashboardStakingHooks(account, supportsStaking, {
    addToTotalScanning,
    incrementProgress,
}) {

    const protocols = useProtocols().protocols

    const stakingQuery = useQuery({
        queryKey: ['staking', account],
        staleTime: 1000 * 60 * 3,
        queryFn: async () => {
            let farmingProtocols = protocols.filter(proto => {
                return proto.primitives.includes('FARMING');
            });

            addToTotalScanning(farmingProtocols.length);

            const results = farmingProtocols.map(async (protocol) => {
                const result = await farmingPositions(account, protocol)
                incrementProgress();
                return result;
            });
            return (await Promise.all(results)).flat();
        },
        enabled: protocols.length > 0 && !!account
    })


    function refresh() {
        stakingQuery.refetch();
    }

    return {
        stakings: stakingQuery.data || [],
        refresh
    }
};