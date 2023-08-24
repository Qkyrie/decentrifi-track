import {getSigner} from "./withContract";
import {useTransactions} from "./useTransactions";
import useWeb3 from "./web3";

export const useClaims = () => {

    const web3 = useWeb3();
    const transaction = useTransactions();

    const initiateClaim = async (claimable) => {
        const validated = await transaction.validateChainId(claimable.network.chainId);
        if (validated === true) {
            if (claimable.claimTransaction.from == null || claimable.claimTransaction.from.toLowerCase() == web3.account.toLowerCase()) {
                return await getSigner(web3.web3React.provider, web3.account).sendTransaction(
                    {
                        to: claimable.claimTransaction.to,
                        data: claimable.claimTransaction.data
                    }
                );
            } else {
                throw new Error("You are not able to perform this transaction for this claimable");
            }
        }
    }

    return {
        claim: initiateClaim
    }
}