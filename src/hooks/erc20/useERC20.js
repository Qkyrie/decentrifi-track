import {withContract} from "../withContract";
import ERC20 from "../../constants/abis/erc20/ERC20.json"
import {MaxUint256} from "@ethersproject/constants";
import {useTransactions} from "../useTransactions";
import {Web3Provider} from "@ethersproject/providers";
import useWeb3 from "../web3";
import Big from "big.js";


export const useERC20 = () => {

    const web3 = useWeb3();

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

    const transfer = async (token, to, amount) => {
        const power = Big(10).pow(token.decimals);
        const normalizedAmount = Big(amount).times(power).toFixed(0);
        console.log("attempting to send " + normalizedAmount + " tokens to " + to);
        const contract = withContract(token.address, ERC20, web3)
        return contract.transfer(to, normalizedAmount);
    }

    return {
        balanceOf,
        allowance,
        approve,
        transfer,
        fullApprove
    }
}