import {useQuery} from "@tanstack/react-query";
import {getApprovals} from "../../../api/whalespotter/approvals/Approvals";
import {useERC20} from "../../../hooks/erc20/useERC20";
import useWeb3 from "../../../hooks/web3";
import {useTransactions} from "../../../hooks/useTransactions";

export function useApprovalHooks(address) {

    const approvalQuery = useQuery({
        queryKey: ['account', address, 'allowance'],
        queryFn: async () => {
            return await getApprovals(address)
        },
        enabled: !!address
    })

    return {
        allowances: approvalQuery.data || [],
        isLoading: approvalQuery.isLoading,
    }
}