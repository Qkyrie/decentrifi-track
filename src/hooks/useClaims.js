import {getSigner} from "./withContract";
import {useTransactions} from "./useTransactions";

export const useClaims = (web3) => {

    const transaction = useTransactions(web3);

    const initiateClaim = async (claimable) => {
        await transaction.validateChainId(claimable.network.chainId);

        if (claimable.claimTransaction.from == null || claimable.claimTransaction.from.toLowerCase() == web3.account.toLowerCase()) {
            return await getSigner(web3.web3React.provider, web3.account).sendTransaction(
                {
                    to: claimable.claimTransaction.to,
                    data: claimable.claimTransaction.data
                }
            )
        } else {
            throw new Error("You are not able to perform this transaction for this claimable");
        }
    }

    return {
        claim: initiateClaim
    }
}