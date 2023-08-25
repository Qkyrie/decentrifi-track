import React, {useEffect} from 'react';


import useWeb3 from "../../hooks/web3";
import ReactGA from "react-ga4";
import ConnectWalletSection from "../../components/ConnectWalletSection/ConnectWalletSection";
import NoWeb3Browser from "../../components/ConnectWalletSection/NoWeb3Browser";
import tw from "twin.macro";
import CustomHeader from "../../components/Header/CustomHeader";
import {useHistory} from "react-router-dom";

const Container = tw.div`px-2 flex pt-8 lg:pt-24 bg-defaultBackground`
const Center = tw.div`w-full grid justify-items-center`;


export default function Web3ClaimableView() {

    const web3 = useWeb3();
    const history = useHistory();

    const onAddressChange = (address) => {
        history.push(`/${address}/claimables`);
    };

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }, [])

    if (web3.account != null) {
        history.push(`/${web3.account}/claimables`);
        return <></>;
    } else {
        return <>
            <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
            <Container>
                <Center>
                    {
                        web3.supported && <ConnectWalletSection/>
                    }
                    {
                        !web3.supported && <NoWeb3Browser/>
                    }
                </Center>
            </Container>

        </>
    }
};