import {hooks as metamaskHooks, metaMask} from "./connectors/metamask";
import {hooks as walletConnectHooks, walletConnectV2} from "./connectors/walletconnect";
import {useWeb3React} from '@web3-react/core'
import {useEffect} from "react";
import {MetaMask} from "@web3-react/metamask";
import {getByChainId} from "../chains/chains";

export default function useWeb3() {

    const {ethereum} = window

    const web3React = useWeb3React();

    const {
        useIsActive: mmIsActive
    } = metamaskHooks;

    const {
        useIsActive: wcIsActive
    } = walletConnectHooks;

    const metamaskIsActive = mmIsActive();
    const walletConnectIsActive = wcIsActive();

    useEffect(() => {
        console.log('metamask active: ', metamaskIsActive);
        console.log('walletconnect active: ', walletConnectIsActive);
    }, [metamaskIsActive]);

    function getActiveHook() {
        if (metamaskIsActive) {
            return metamaskHooks
        } else {
            return walletConnectHooks
        }
    }

    const supported = function () {
        return window.ethereum !== undefined
    };

    async function connectWalletConnect() {
        await walletConnectV2.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to metamask')
        })
    }

    async function browserConnect() {
        //  console.log('connecting eagerly');
        await metaMask.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to metamask')
        })
    }

    const walletConnectLogin = async () => {
        try {
            await walletConnectV2.activate();
        } catch (ex) {
            console.error(ex)
        }
    }

    const metamaskLogin = async () => {
        try {
            await metaMask.activate()
        } catch (ex) {
            console.error(ex)
        }
    };

    async function changeNetwork(networkId) {
        console.log('changing network');
        const chainConfig = getByChainId(networkId);
        console.log(chainConfig);
        await metaMask.activate(chainConfig)
    }

    return {
        changeNetwork: changeNetwork,
        ethereum: ethereum,
        metamaskLogin,
        walletConnectLogin,
        autoConnect: browserConnect,
        hasAccount: getActiveHook().useAccount()?.length > 0,
        active: getActiveHook().useIsActive(),
        supported: supported(),
        web3React: web3React,
        account: getActiveHook().useAccount(),
    }
};