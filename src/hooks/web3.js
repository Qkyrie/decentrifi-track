import {hooks as metamaskHooks, metaMask} from "./connectors/metamask";
import {hooks as walletConnectHooks, walletConnectV2} from "./connectors/walletconnect";
import {useWeb3React} from '@web3-react/core'
import {getByChainId} from "../chains/chains";

export default function useWeb3() {

    const web3React = useWeb3React();

    const metamaskWeb3 = useMetamaskWeb3();
    const walletConnectWeb3 = useWalletConnectWeb3();

    const supported = function () {
        return window.ethereum !== undefined
    };

    async function autoConnect() {
        await web3React.connector.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to connector')
        })
    }

    function getActiveWeb3() {
        if (metamaskWeb3.active) {
            return metamaskWeb3;
        } else if (walletConnectWeb3.active) {
            return walletConnectWeb3;
        } else {
            return undefined;
        }
    }

    async function disconnect() {
        if (web3React.connector.deactivate !== undefined) {
            await web3React.connector.deactivate();
        }
    }

    const walletConnectLogin = async () => {
        try {
            await walletConnectWeb3.connector.activate();
        } catch (ex) {
            console.error(ex)
        }
    }

    const metamaskLogin = async () => {
        try {
            await metamaskWeb3.connector.activate()
        } catch (ex) {
            console.error(ex)
        }
    };

    async function changeNetwork(networkId) {
        const chainConfig = getByChainId(networkId);
        web3React.connector.activate(chainConfig)
    }


    return {
        changeNetwork: changeNetwork,
        metamaskLogin,
        walletConnectLogin,
        autoConnect,
        hasAccount: getActiveWeb3()?.hasAccount || false,
        active: getActiveWeb3()?.active || false,
        supported: supported(),
        web3React: web3React,
        account: getActiveWeb3()?.account || undefined,
        disconnect,
    }
}

function useMetamaskWeb3() {

    const {
        useAccount,
        useIsActive
    } = metamaskHooks;

    const account = useAccount();
    const active = useIsActive();

    async function deactivate() {
        return metaMask.deactivate();
    }

    function getHasAccount() {
        return account?.length > 0;
    }

    async function autoconnect() {
        return metaMask.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to connector')
        });
    }

    return {
        connector: metaMask,
        hasAccount: getHasAccount(),
        active,
        account,
        deactivate,
        autoconnect,
        activate: metaMask.activate
    }
}

function useWalletConnectWeb3() {

    const {
        useAccount,
        useIsActive
    } = walletConnectHooks;

    const account = useAccount();
    const active = useIsActive();

    async function deactivate() {
        return walletConnectV2.deactivate();
    }

    function getHasAccount() {
        return account?.length > 0;
    }

    async function autoconnect() {
        return walletConnectV2.connectEagerly().then(result => {
            console.log('connected eagerly: ', result);
        }).catch(() => {
            console.debug('Failed to connect eagerly to connector')
        });
    }

    return {
        connector: walletConnectV2,
        hasAccount: getHasAccount(),
        active,
        account,
        deactivate,
        activate: walletConnectV2.activate,
        autoconnect,
        hasBrowserWallet: window.ethereum !== undefined
    }
}