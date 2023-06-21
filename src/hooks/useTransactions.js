export const useTransactions = (web3) => {

    const validateChainId = async (chainId) => {
        if (chainId !== web3.web3React.chainId) {
            try {
                await web3.changeNetwork(chainId);
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
        }

    }
    return {
        validateChainId
    }
}

