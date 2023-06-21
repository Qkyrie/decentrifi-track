import CustomHeader from "../../components/Header/CustomHeader";
import ConnectWalletSection from "../../components/ConnectWalletSection/ConnectWalletSection";
import NoWeb3Browser from "../../components/ConnectWalletSection/NoWeb3Browser";
import React from "react";
import tw from "twin.macro";
import useWeb3 from "../../hooks/web3";

const Container = tw.div`px-2 flex pt-8 lg:pt-24 bg-defaultBackground`
const Center = tw.div`w-full grid justify-items-center`;


export default function ConnectWalletView({onAddressChange}) {

    const web3 = useWeb3();

    return   <>
        <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
        <Container>
            <Center>
                {
                    web3.supported && <ConnectWalletSection />
                }
                {
                    !web3.supported && <NoWeb3Browser/>
                }
            </Center>
        </Container>
    </>
};