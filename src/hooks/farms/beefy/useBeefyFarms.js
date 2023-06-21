import {withContract} from "../../withContract";
import BeefyVaultV6 from "../../../constants/abis/beefy/BeefyVaultV6.json";


export const useBeefyFarms = (web3ReactContextInterface) => {

    const depositAll = async (contractAddress, network) => {
        const contract = withContract(contractAddress, BeefyVaultV6, web3ReactContextInterface)
        console.log("let's depositAll");
        return await contract.depositAll()
    }

    const withdrawAll = async (contractAddress, network) => {
        const contract = withContract(contractAddress, BeefyVaultV6, web3ReactContextInterface)
        return await contract.withdrawAll()
    }

    return {
        depositAll: depositAll,
        withdrawAll: withdrawAll
    }
}