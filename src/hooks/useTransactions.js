import swal from "sweetalert";
import useWeb3 from "./web3";

export const useTransactions = () => {

    const web3 = useWeb3();

    const handleErrorResult = async (err) => {
        if (err.message.includes('user rejected')) {
            swal({
                text: 'You rejected the operation.\nNo transaction was signed or submitted.',
                icon: "info"
            })
        } else {
            swal({
                text: 'Something went wrong trying to sign the transaction.',
                icon: "error"
            })
            console.log(err.message);
        }
    }

    const isOnCorrectChain = (chainId) => {
        return chainId === web3.web3React.chainId
    }

    const validateChainId = async (chainId) => {
        if (chainId !== web3.web3React.chainId) {
            try {
                await web3.changeNetwork(chainId);
                return true;
            } catch (err) {
                console.log(err);
                if(err.code === 4001) {
                    console.log('user rejected');
                    return false;
                }
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
                    return false
                }
            }
        } else{
            return true;
        }
    }
    return {
        validateChainId,
        isOnCorrectChain,
        handleErrorResult
    }
}

