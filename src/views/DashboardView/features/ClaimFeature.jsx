import {DollarSign} from "feather-icons-react/build/IconComponents";
import tw from "twin.macro";
import React from "react";

import Feature from "../../../components/features/TwoColWithTwoHorizontalFeaturesAndButton";
import Unicorn from "../../../images/unicorns/searching-unicorn.png";

const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
const HighlightedText = tw.span`text-primary-500`;

export default function ClaimFeature() {
    return (
        <Feature
            textOnLeft={false}
            subheading={<Subheading>Claim your rewards</Subheading>}
            heading={<>
                Explore <HighlightedText>your yield</HighlightedText>
            </>}
            description={<>
                The land of defi is vast and full of opportunities. We help you to <HighlightedText>keep
                track of your yield</HighlightedText> and
                <HighlightedText> claim your rewards</HighlightedText> in a timely manner.
            </>}
            primaryButtonText={"EXPLORE DECENTRIFI TRACKER"}
            primaryButtonUrl={"https://track.decentri.fi/claimables"}
            imageSrc={Unicorn}
            showDecoratorBlob={false}
            features={
                [
                    {
                        Icon: DollarSign,
                        title: "Farming Rewards",
                        description: "Easily find and claim your farming rewards from all the major protocols. We support a variety of chains and protocols.",
                        iconContainerCss: tw`bg-purple-300 text-purple-800`
                    },
                    {
                        Icon: DollarSign,
                        title: "Airdrops",
                        description: "Missed an airdrop? We'll notify you when you qualify for a pending airdrop.",
                        iconContainerCss: tw`bg-purple-300 text-purple-800`
                    }
                ]
            }
        />
    )
}