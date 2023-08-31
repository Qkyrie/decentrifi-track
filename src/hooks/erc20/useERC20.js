import {withContract} from "../withContract";
import ERC20 from "../../constants/abis/erc20/ERC20.json"
import {MaxUint256} from "@ethersproject/constants";
import {useTransactions} from "../useTransactions";
import {Web3Provider} from "@ethersproject/providers";


export const useERC20 = (web3) => {

    const transaction = useTransactions(web3)

    const balanceOf = async (userAddress, erc20) => {
        const contract = withContract(erc20, ERC20, web3)
        return await contract.balanceOf(userAddress);
    }

    const allowance = async (userAddress, erc20, spender) => {
        if (userAddress == null || erc20 == null || spender == null) {
            return 0;
        }
        const contract = withContract(erc20, ERC20, web3);
        return await contract.allowance(userAddress, spender);
    }

    const approve = async (erc20, spender, amount) => {
        const contract = withContract(erc20, ERC20, web3)
        return await contract.approve(spender, amount)
    }

    const fullApprove = async (erc20, spender) => {
        console.log('erc20' + erc20);
        console.log('spender' + spender);
        const contract = withContract(erc20, ERC20, web3)
        return await contract.approve(spender, MaxUint256);
    }

    return {
        balanceOf: balanceOf,
        allowance: allowance,
        approve: approve,
        fullApprove: fullApprove
    }
}