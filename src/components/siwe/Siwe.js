import React from "react";
import tw from "twin.macro";
import {SectionHeading, Subheading as SubheadingBase} from "../../components/misc/Headings";
import {SectionDescription} from "../misc/Typography";
import {PrimaryButton} from "../misc/Buttons";
import useSiwe from "../../hooks/siwe/useSiwe";
import {useHistory} from "react-router-dom";
import useWeb3 from "../../hooks/web3";
import ConnectWalletSection from "../ConnectWalletSection/ConnectWalletSection";

const SectionWithBackground = tw.div`grid w-full justify-items-center bg-defaultBackground pt-2`
const HighlightedText = tw.span`text-primary-500`
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center mb-4`;

const ActionContainer = tw.div`mb-2`

export default function Siwe({target}) {
    const siwe = useSiwe();
    const history = useHistory();
    const web3 = useWeb3();

    async function handleClick() {
        console.log('doing tihngs')
        await siwe.getSignature(web3.account);
        history.push(target)
    }

    if (web3.account == null) {
        return <ConnectWalletSection />
    } else {
        return (
            <SectionWithBackground>
                <Subheading>Verify ownership of your account</Subheading>
                <Heading> <HighlightedText>Sign in</HighlightedText> with Ethereum</Heading>
                <Description>In order to get your history, we'll need to have you sign in with Ethereum.
                    <br/>
                    You only need to do this once.
                </Description>
                <ActionContainer>
                    <PrimaryButton onClick={handleClick}>Sign in With Ethereum</PrimaryButton>
                </ActionContainer>
            </SectionWithBackground>
        );
    }

}