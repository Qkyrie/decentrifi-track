import {poolingPositions} from "../../../api/defitrack/pools/pools";
import useProtocols from "./useProtocols";
import {useQuery} from "@tanstack/react-query";

export default function useDashboardLPHooks(account, supportsPooling, {addToTotalScanning, incrementProgress}) {
    const {protocols} = useProtocols();

    const poolingQuery = useQuery({
        queryKey: ['pooling', account],
        staleTime: 1000 * 60 * 3,
        queryFn: async () => {
            let poolingProtocols = protocols.filter(proto => {
                return proto.primitives.includes('POOLING');
            });

            addToTotalScanning(poolingProtocols.length);

            const result = new ResultHolder();

            poolingProtocols.forEach(async (protocol) => {
                const positions = await poolingPositions(account, protocol)
                incrementProgress();
                positions.forEach(position => {
                    result.push(position);
                })
            });

            return result;
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
        poolingQuery.refetch();
    }

    return {
        lps: poolingQuery.data?.results || [],
        refresh
    }
};