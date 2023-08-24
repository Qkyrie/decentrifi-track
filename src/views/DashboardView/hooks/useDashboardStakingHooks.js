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

            const result = new ResultHolder();

            farmingProtocols.forEach(async (protocol) => {
                const positions = await farmingPositions(account, protocol)
                incrementProgress();
                positions.forEach((position) => result.push(position))
            });

            return result
        },
        enabled: protocols.length > 0 && !!account
    });

    class ResultHolder {
        results = []

        push(element) {
            this.results.push(element);
        }
    }

    function refresh() {
        stakingQuery.refetch();
    }

    return {
        stakings: stakingQuery.data?.results || [],
        refresh
    }
};