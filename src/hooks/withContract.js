import {Contract} from '@ethersproject/contracts'

export const withContract = function (address, abi, web3) {
    return getContract(address, abi, web3, web3.account)
};

function getContract(address, abi, web3, account) {
    return new Contract(
        address, abi, getSigner(web3.web3React.provider, account)
    )
}

export function getSigner(provider, account) {
    return provider.getSigner(account).connectUnchecked()
}