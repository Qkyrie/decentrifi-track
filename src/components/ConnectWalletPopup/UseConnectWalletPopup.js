import Popup from "reactjs-popup";
import React, {useRef, useState} from "react";

import tw from "twin.macro";
import useWeb3 from "../../hooks/web3";

import Metamask from "../../images/metamask.png";

const Container = tw.div`grid w-full justify-items-center`;
const CloseContainer = tw.div`p-4 w-full`
const Header = tw.h1`text-lg font-black text-purple-600`
const ConnectList = tw.div`flex flex-col w-full mx-2 mb-8`
const ConnectListItem = tw.div`items-center my-2 hover:border-blue-500 border-2 font-bold text-gray-700 hover:text-blue-500 hover:border-2 w-full flex flex-row rounded rounded-lg p-4`
const ConnectItemLogo = tw.img`w-8 h-8 mr-4`

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
                        <ConnectListItem onClick={() => web3.metamaskLogin().then(() => {
                            setOpen(false);
                        })}>
                            <ConnectItemLogo src={Metamask} alt="metamask" width="32" height="32"/>
                             Metamask
                        </ConnectListItem>
                    </ConnectList>
                </Container>
            </Popup>
        ),
        open: () => setOpen(true)
    }

}