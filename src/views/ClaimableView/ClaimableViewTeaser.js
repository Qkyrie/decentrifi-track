import React, {useEffect} from 'react';


import useWeb3 from "../../hooks/web3";
import ReactGA from "react-ga4";
import ConnectWalletSection from "../../components/ConnectWalletSection/ConnectWalletSection";
import NoWeb3Browser from "../../components/ConnectWalletSection/NoWeb3Browser";
import tw from "twin.macro";
import CustomHeader from "../../components/Header/CustomHeader";
import {useHistory} from "react-router-dom";
import DollarLabel from "../../components/Label/DollarLabel";
import {SectionHeading, Subheading as SubheadingBase} from "../../components/misc/Headings";
import {SectionDescription} from "../../components/misc/Typography";
import FAQ from "../../components/faqs/SingleCol";

const Container = tw.div`px-2 flex pt-8 lg:pt-24 bg-defaultBackground`
const Center = tw.div`w-full grid justify-items-center`;

const Section = tw.div`grid w-full justify-items-center pt-2`
const HighlightedText = tw.span`text-primary-500`

const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center mb-4`;

const FAQSection = tw.div`w-full px-4  bg-white`

const faqs = [
    {
        question: "How do we know what is claimable for your address?",
        answer: "We keep an index of a vast amount of web3 applications. By surfing to this page, " +
            "we query the blockchain to see if you have any unclaimed or outstanding rewards."
    },
    {
        question: "Can I claim things straight from this app?",
        answer: "At often times, you can. When we find an unclaimed reward, a button will appear. Clicking that button will popup metamask with the correct transaction prefilled."
    },
    {
        question: "Why does it take a while to load this page?",
        answer: "We keep track of thousands of farms, pools and applications. In order to ensure we find everything, we scan for every possible reward."
    }
]


export default function ClaimableViewTeaser() {

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
                <Section>
                    <Subheading>defi rewards might be waiting for you</Subheading>
                    <Heading>You might have got <HighlightedText><DollarLabel amount={
                        420.69
                    }/></HighlightedText> of
                        outstanding <HighlightedText>rewards.</HighlightedText></Heading>
                    <Description></Description>
                </Section>
            </Container>
            <Container>
                <FAQSection>
                    <FAQ
                        description={""}
                        faqs={faqs}
                        subheading={"Frequently asked claiming questions"}
                        heading={<>Any <HighlightedText>Questions ?</HighlightedText></>}
                    />
                </FAQSection>
            </Container>
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