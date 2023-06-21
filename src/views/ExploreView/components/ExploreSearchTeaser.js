import React, {useRef} from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import {ReactComponent as SvgDecoratorBlob1} from "images/svg-decorator-blob-1.svg";
import DesignIllustration from "images/unicorn-magnify.png";
import useWeb3 from "../../../hooks/web3";
import useConnectWalletPopup from "../../../components/ConnectWalletPopup/UseConnectWalletPopup";
import {useHistory} from "react-router-dom";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto `;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;

const SearchAction = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0 mb-2`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }

  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const ConnectAction = styled.div`
  ${tw`relative max-w-md text-center mx-auto ml-2 mb-2`}
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center h-16 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

export default ({roundedHeaderButton}) => {

    const web3 = useWeb3();
    const searchAddress = useRef();
    const history = useHistory();

    const search = async function () {
        const address = searchAddress.current.value;
        if (address.length === 40 || address.length === 42) {
            history.push(`/${address}/profile`);
        }
    };

    const {
        html: connectWalletPopup,
        open: openConnectWalletPopup
    } = useConnectWalletPopup();

    return (
        <>
            <Container>
                <TwoColumn>
                    <LeftColumn>
                        <Heading>
                            Explore <span tw="text-primary-500">DeFi</span>
                        </Heading>
                        <Paragraph>
                            The easiest way to get up to speed is to connect your wallet and start. We curently support
                            MetaMask, WalletConnect, and Coinbase Wallet.
                        </Paragraph>
                        <SearchAction>
                            <input ref={searchAddress} type="text" placeholder="Paste Address (0x...)"/>
                            <button onClick={search}>Search</button>
                        </SearchAction>
                        {
                            web3.supported && !web3.active &&
                            <ConnectAction>
                                <button onClick={() => {
                                    openConnectWalletPopup();
                                }}>Connect</button>
                            </ConnectAction>
                        }
                    </LeftColumn>
                    <RightColumn>
                        <IllustrationContainer>
                            <img src={DesignIllustration}
                                 alt="Design Illustration"/>
                        </IllustrationContainer>
                    </RightColumn>
                </TwoColumn>
                <DecoratorBlob1/>
            </Container>
            {connectWalletPopup}
        </>
    );
};
