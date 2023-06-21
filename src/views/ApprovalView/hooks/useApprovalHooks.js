import {useQuery} from "@tanstack/react-query";
import {getApprovals} from "../../../api/whalespotter/approvals/Approvals";
import {useERC20} from "../../../hooks/erc20/useERC20";
import useWeb3 from "../../../hooks/web3";

export function useApprovalHooks(address) {

    const web3 = useWeb3();
    const erc20 = useERC20(web3);

    const revoke = async (allowance) => {
        await erc20.approve(allowance.token.address, allowance.spender.address, 0, allowance.network.chainId)
    }

    const approvalQuery = useQuery({
        queryKey: ['account', address, 'allowance'],
        queryFn: async () => {
            return await getApprovals(address)
        }
    })

    return {
        allowances: approvalQuery.data || [],
        isLoading: approvalQuery.isLoading,
        revoke
    }
}