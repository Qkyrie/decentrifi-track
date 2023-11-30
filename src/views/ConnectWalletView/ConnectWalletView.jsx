import CustomHeader from "../../components/Header/CustomHeader";
import ConnectWalletSection from "../../components/ConnectWalletSection/ConnectWalletSection";
import React from "react";
import tw from "twin.macro";
import useWeb3 from "../../hooks/web3";
import ClaimFeature from "../DashboardView/features/ClaimFeature";
import RevokeAllowanceFeature from "../DashboardView/features/RevokeAllowanceFeature";

const Container = tw.div`px-2 flex pt-8 lg:pt-24 bg-primary-100`
const Center = tw.div`w-full grid justify-items-center`;
const Dark = tw.section`bg-purple-300`


export default function ConnectWalletView({onAddressChange}) {

    return <>
        <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
        <ClaimFeature />
        <Dark>
            <RevokeAllowanceFeature />
        </Dark>
        <Container>
            <Center>
                <ConnectWalletSection/>
            </Center>
        </Container>
    </>
};