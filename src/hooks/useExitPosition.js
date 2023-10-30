import {getSigner} from "./withContract";

import defihub from "@decentri.fi/defi-hub"
import useWeb3 from "./web3";
import {useTransactions} from "./useTransactions";

export const useExitPosition = () => {

    const web3 = useWeb3();
    const transaction = useTransactions();


    const initiateExitPosition = async (position) => {

        const validated = await transaction.validateChainId(position.network.chainId);
        if (validated) {
            const preparedTransactionFn = await defihub.exit().exitPositionFunction(position);
            const preparedTransactions = await preparedTransactionFn(web3.account, position.tokenAmount);
            console.log(preparedTransactions)
            const transactions = preparedTransactions.transactions;
            for (const tx of transactions) {
                if (tx.from == null || tx.from.toLowerCase() === web3.account.toLowerCase()) {
                    await getSigner(web3.web3React.provider, web3.account).sendTransaction(
                        {
                            to: tx.to,
                            data: tx.data
                        }
                    )
                    console.log('populated', tx);
                } else {
                    throw new Error("You are not able to perform this transaction for this claimable");
                }
            }
        } else {
            throw new Error("You are not able to perform this transaction for this claimable");
        }
    }

    return {
        doExit: initiateExitPosition
    }
}