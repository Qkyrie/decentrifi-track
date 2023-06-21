import {getSigner} from "./withContract";

import defihub from "@decentri.fi/defi-hub"

export const useExitPosition = (web3) => {
    const initiateExitPosition = async (position) => {
        if (position.network.chainId !== web3.web3React.chainId) {
            try {
                await web3.changeNetwork(position.network.chainId);
            } catch (err) {
                if (err.code === 4902) {
                    throw new Error("Failed to change network, please add it manually");
                    /*    await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainName: 'Polygon Mainnet',
                                    chainId: web3.utils.toHex(chainId),
                                    nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                                    rpcUrls: ['https://polygon-rpc.com/']
                                }
                            ]
                        }); *  */
                } else {
                    console.log(err);
                }
            }
        } else {
            const preparedTransactionFn = await defihub.exit().exitPositionFunction(position)
            const preparedTransactions = await preparedTransactionFn(web3.account, position.tokenAmount);
            const transactions = preparedTransactions.transactions;
            for (const tx of transactions) {
                if (tx.from == null || tx.from.toLowerCase() === web3.account.toLowerCase()) {
                    await getSigner(web3.web3React.provider, web3.account).sendTransaction(
                        {
                            to: tx.to,
                            data: tx.data
                        }
                    )
                } else {
                    throw new Error("You are not able to perform this transaction for this claimable");
                }
            }
        }
    }

    return {
        exit: initiateExitPosition
    }
}