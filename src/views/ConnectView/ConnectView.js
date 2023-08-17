import React, {useEffect} from 'react';
import erc20ImageSrc from "../../images/erc20_carbon.png";
import ReactGA from "react-ga4";
import MainFeature from "../../components/features/TwoColWithButton";
import TwoColWithButton from "../../components/features/TwoColWithButton";
import FAQ from "../../components/faqs/TwoColumnPrimaryBackground";
import MoneyUnicornPic from "../../images/moneyunicorns.png";
import tw from "twin.macro";
import Ourwork from "./our-work";

const Dark = tw.section`bg-defaultBackground`

export default function ConnectView() {

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])

    return (
        <>
            <Dark>
                <TwoColWithButton
                    subheading={"Decentri Defi Hub"}
                    heading={<>
                        Infrastructure to build on top of <span tw="text-primary-500">DeFi</span>
                    </>}
                    primaryButtonUrl={"https://docs.decentri.fi"}
                    buttonRounded={false}
                    description={"We build tools. We build infrastructure. We help you shape the future of DeFi."}
                    primaryButtonText={"READ THE DOCS"}
                    imageSrc={MoneyUnicornPic}
                />

            </Dark>
            <>
                <MainFeature
                    subheading="Developer Friendly"
                    heading="Open Source. High Standards."
                    description="Although fully open source, our developers main focus is code clean architecture.
                   Our team has a history of shipping high quality code in different markets.
                   Decentrifi is open source code at industrial level standards."
                    imageSrc={erc20ImageSrc}
                    buttonRounded={false}
                    primaryButtonUrl="https://github.com/decentri-fi/defi-hub"
                    textOnLeft={false}
                />
                <FAQ faqs={
                    [
                        {
                            question: "Can we request protocols to be added?",
                            answer: "Yes, absolutely! You can request your implementation at https://docs.decentri.fi/general/supported-protocols#request-a-protocol."
                        },
                        {
                            question: "Is Defitrack a decentralized application?",
                            answer: "Defitrack is not a decentralized application. It's a gateway to web3 protocols. You don't need any blockchain or cryptocurrency knowledge to integrate with decentralized finance."
                        }
                    ]
                } description={"🔥This might contain an answer to your burning questions.🔥"}/>

                <Ourwork/>
            </>
        </>
    )
};