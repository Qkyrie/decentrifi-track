import {getSigner} from "./withContract";
import {useTransactions} from "./useTransactions";
import useWeb3 from "./web3";
import swal from "sweetalert";

export const useClaims = () => {

    const web3 = useWeb3();
    const transaction = useTransactions();

    const initiateClaim = async (claimable) => {
        const validated = await transaction.validateChainId(claimable.network.chainId);
        if (validated === true) {
            if (claimable.claimTransaction.from == null || claimable.claimTransaction.from.toLowerCase() == web3.account.toLowerCase()) {
                const signer = await getSigner(web3.web3React.provider, web3.account);
                const tx = await signer.populateTransaction({
                    to: claimable.claimTransaction.to,
                    data: claimable.claimTransaction.data
                });
                return signer.sendTransaction(tx);
            } else {
                swal({
                    text: 'Only the owner of this claimable can perform this transaction.',
                    icon: "error"
                })
                return undefined
            }
        }
    }

    return {
        claim: initiateClaim
    }
}