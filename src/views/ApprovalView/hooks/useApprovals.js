import useWeb3 from "../../../hooks/web3";
import {useERC20} from "../../../hooks/erc20/useERC20";
import {useTransactions} from "../../../hooks/useTransactions";

export function useApprovals() {

    const web3 = useWeb3();
    const erc20 = useERC20(web3);
    const transactions = useTransactions()

    const revoke = async (allowance) => {
        const validated = await transactions.validateChainId(allowance.network.chainId);
        if (validated === true) {
            return await erc20.approve(allowance.token.address, allowance.spender.address, 0, allowance.network.chainId);
        }
    }

    return {
        revoke
    }
}