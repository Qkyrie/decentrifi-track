import Popup from "reactjs-popup";
import React, {useRef, useState} from "react";

import tw from "twin.macro";
import useWeb3 from "../../hooks/web3";

import Metamask from "../../images/metamask.png";
import WalletConnect from "../../images/walletconnect.png";

const Container = tw.div`grid w-full justify-items-center`;
const CloseContainer = tw.div`p-4 w-full`
const Header = tw.h1`text-lg font-black text-purple-600`
const ConnectList = tw.div`flex flex-col mx-2 mb-8 w-full grid justify-items-center`
const ConnectListItem = tw.div`w-3/4 hover:border-blue-300 border-2 font-bold text-gray-700 hover:text-blue-300 hover:border-2 flex flex-row rounded rounded-lg`
const ConnectItemLogo = tw.img`w-16 h-16 mr-4`

const ConnectionDescription = tw.div`text-xs text-gray-400`

export default function useConnectWalletPopup() {

    const web3 = useWeb3();

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return {
        html: (
            <Popup modal open={open} onClose={closeModal}>
                <Container>
                    <CloseContainer>
                        <a className="close" onClick={closeModal}>
                            &times;
                        </a>
                    </CloseContainer>
                    <Header>Connect Wallet</Header>
                    <ConnectList>
                        <ConnectListItem onClick={async () => await web3.metamaskLogin().then(() => {
                            setOpen(false);
                        })}>
                            <ConnectItemLogo src={Metamask} alt="metamask" width="32" height="32"/>
                            <div>
                                <span>Browser Wallet</span> <br />
                                <ConnectionDescription>A browser wallet like Metamask is a browser extension that allows you to interact with the Ethereum blockchain</ConnectionDescription>
                            </div>
                        </ConnectListItem>
                    </ConnectList>
                    <ConnectList>
                        <ConnectListItem onClick={async () => {
                            setOpen(false);
                            await web3.walletConnectLogin()
                        }}>
                            <ConnectItemLogo src={WalletConnect} alt="walletconnect" width="32" height="32"/>
                            <div>
                                <span>WalletConnect</span> <br/>
                                <ConnectionDescription>WalletConnect is a bridge that connects Decentralized Applications (DApps) to your web3 crypto wallet</ConnectionDescription>
                            </div>
                        </ConnectListItem>
                    </ConnectList>
                </Container>
            </Popup>
        ),
        open: () => setOpen(true)
    }

}