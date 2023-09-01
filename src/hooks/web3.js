import {hooks as metamaskHooks, metaMask} from "./connectors/metamask";
import {hooks as walletConnectHooks, walletConnectV2} from "./connectors/walletconnect";
import {useWeb3React} from '@web3-react/core'
import {useEffect} from "react";
import {getByChainId} from "../chains/chains";

export default function useWeb3() {

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
    }, [metamaskIsActive, walletConnectIsActive]);

    function getActiveHook() {
        if (metamaskIsActive) {
            return metamaskHooks
        } else {
            return walletConnectHooks
        }
    }

    function getActiveConnector() {
        if (metamaskIsActive) {
            return metaMask
        } else {
            return walletConnectV2
        }
    }

    const supported = function () {
        return window.ethereum !== undefined
    };

    async function autoConnect() {
        getActiveConnector().connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to connector')
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
        const chainConfig = getByChainId(networkId);
        await getActiveConnector().activate(chainConfig)
    }

    return {
        changeNetwork: changeNetwork,
        metamaskLogin,
        walletConnectLogin,
        autoConnect,
        hasAccount: getActiveHook().useAccount()?.length > 0,
        active: getActiveHook().useIsActive(),
        supported: supported(),
        web3React: web3React,
        account: getActiveHook().useAccount(),
    }
};