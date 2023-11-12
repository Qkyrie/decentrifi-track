import {getReverseEns} from "../../../api/defitrack/ens/ens";
import {useQuery} from "@tanstack/react-query";
import useWeb3 from "../../../hooks/web3";

export default function useEns(account) {

    const query = useQuery({
        staleTime: 1000 * 60 * 10,
        queryKey: ['ens', account],
        queryFn: async () => {
            if (account) {
                try {
                    return await getReverseEns(account);
                } catch (ex) {
                    return null;
                }
            } else {
                return null
            }
        }
    })

    return {
        ens: query.data?.name
    }
};