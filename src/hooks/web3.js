import {hooks as metamaskHooks, metaMask} from "./metamask";
import {useWeb3React} from '@web3-react/core'
import {Web3Provider} from '@ethersproject/providers'

export default function useWeb3() {

    const {ethereum} = window

    const web3React = useWeb3React();

    const supported = function () {
        return window.ethereum !== undefined
    };

    const connect = async () => {
        await metaMask.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to metamask')
        })
    }

    const metamaskLogin = async () => {
        try {
            if (window.ethereum.isMetaMask) {
                await ethereum.request({
                    method: 'eth_requestAccounts',
                })
                await metaMask.connectEagerly().catch(() => {
                    console.debug('Failed to connect eagerly to metamask')
                })
            }
        } catch (ex) {
            console.error(ex)
        }
    };


    function decimalToHex(d, padding) {
        let hex = Number(d).toString(16);
        padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

        while (hex.length < padding) {
            hex = "0" + hex;
        }

        return hex;
    }


    async function changeNetwork(networkId) {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: "0x" + networkId.toString(16)}], // chainId must be in hexadecimal numbers
        })
    }

    return {
        changeNetwork: changeNetwork,
        ethereum: ethereum,
        metamaskLogin,
        autoConnect: connect,
        hasAccount: metamaskHooks.useAccount()?.length > 0,
        active: metamaskHooks.useIsActive(),
        supported: supported(),
        web3React: web3React,
        provider: metaMask.provider,
        account: metamaskHooks.useAccount(),
    }
};