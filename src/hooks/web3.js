import {hooks as metamaskHooks, metaMask} from "./metamask";
import {useWeb3React} from '@web3-react/core'
import {Web3Provider} from '@ethersproject/providers'
import {useEffect, useState} from "react";
import {getReverseEns} from "../api/defitrack/ens/ens";

export default function useWeb3() {

    const {ethereum} = window

    const web3React = useWeb3React();
    const acc = metamaskHooks.useAccount()



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
                console.log('logging in');
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


    function getLibrary(provider) {
        const library = new Web3Provider(provider)
        library.pollingInterval = 12000
        return library
    }

    function decimalToHex(d, padding) {
        let hex = Number(d).toString(16);
        padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

        while (hex.length < padding) {
            hex = "0" + hex;
        }

        return hex;
    }


    async function changeNetwork(networkId) {
        let chainId = decimalToHex(networkId);
        if (ethereum.overrideIsMetaMask === true) {
            await ethereum.providerMap.get("MetaMask").request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: '0x' + chainId}],
            });
        } else {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: "0x" + chainId}], // chainId must be in hexadecimal numbers
            })
        }
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