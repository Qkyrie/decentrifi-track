import {useBeefyFarms} from "./beefy/useBeefyFarms";

export const useFarms = (web3ReactContextInterface) => {

    const beefyFarms = useBeefyFarms(web3ReactContextInterface);

    const validateNetwork = function (network) {
        if (network.chainId !== web3ReactContextInterface.chainId) {
            throw Error(`web3 is not on the correct chain. ${network.name} chain is required for this transaction.`)
        }
    };

    const depositAll = async (vaultType, contractAddress, network) => {
        validateNetwork(network);
        if (vaultType === 'beefyVaultV6') {
            return await beefyFarms.depositAll(contractAddress, network);
        } else {
            throw Error("This type of farming is not supported yet.");
        }
    }


    const withdraw = async (vaultType, contractAddress, network) => {
        validateNetwork(network);
        if (vaultType === 'beefyVaultV6') {
            return await beefyFarms.withdrawAll(contractAddress, network);
        } else {
            throw Error("This type of farming is not supported yet.");
        }
    }

    return {
        depositAll: depositAll
    }
}