import {initializeConnector} from "@web3-react/core";
import {WalletConnect} from "@web3-react/walletconnect-v2";

export const [walletConnectV2, hooks] = initializeConnector(
    (actions) =>
        new WalletConnect({
            actions,
            options: {
                projectId: 'd67009121d11125ad7b69af4ee8a0816',
                chains: [1],
                optionalChains: [],
                showQrModal: true,
            },
        })
)
