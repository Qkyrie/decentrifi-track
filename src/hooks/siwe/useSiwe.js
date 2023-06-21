import useWeb3 from "../web3";
import {SiweMessage} from "siwe";

export default function useSiwe() {
    const domain = window.location.host;
    const origin = window.location.origin;

    const web3 = useWeb3();

    function createSiweMessage(address, statement) {
        const message = new SiweMessage({
            domain,
            address,
            statement,
            uri: origin,
            version: '1',
            chainId: '1'
        });
        return message.prepareMessage();
    }

    async function createMessage(address) {
//        const signer = web3.web3React.provider.getSigner();
        //       let address = await signer.getAddress();
        return createSiweMessage(
            address,
            'Sign in with Ethereum to https://decentri.fi.'
        );
    }

    async function createSignature(address) {
        const signer = web3.web3React.provider.getSigner();
        return await signer.signMessage(await getMessage(address));
    }

    async function getMessage(address) {
        if (localStorage.getItem(`${address}_siwe_message`) == null) {
            let value = await createMessage(address);
            localStorage.setItem(`${address}_siwe_message`, value);
        }
        return localStorage.getItem(`${address}_siwe_message`);
    }

    async function getSignature(address) {
        if (localStorage.getItem(`${address}_siwe_signature`) == null) {
            localStorage.setItem(`${address}_siwe_signature`, await createSignature(address));
        }
        return localStorage.getItem(`${address}_siwe_signature`);
    }

    return {
        getSignature: () => getSignature(web3.account),
        getMessage: () => getMessage(web3.account),
        owner: web3.account,
        isAuthenticated: () => {
            const acc = web3.account;
            if (!acc) {
                return false
            }
            return localStorage.getItem(`${acc}_siwe_signature`) != null;
        }
    }
}