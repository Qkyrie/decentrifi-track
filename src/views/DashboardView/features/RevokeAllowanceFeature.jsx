import {DollarSign} from "feather-icons-react/build/IconComponents";
import tw from "twin.macro";
import React from "react";

import Feature from "../../../components/features/TwoColWithTwoHorizontalFeaturesAndButton";
import Unicorn from "../../../images/unicorns/unicorn-stop-sign.png";

const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
const HighlightedText = tw.span`text-primary-300`;


export default function RevokeAllowanceFeature() {
    return (
        <Feature
            textOnLeft={true}
            subheading={<Subheading>Check your allowances</Subheading>}
            heading={<>
                Revoke <HighlightedText>unused allowances</HighlightedText>
            </>}
            description={<>
                It's 2023. Let's not keep hot wallets open to full allowances anymore. It opens you up for
                 <HighlightedText> targeted attacks</HighlightedText> and <HighlightedText>protocol hacks.</HighlightedText>
            </>}
            primaryButtonText={"EXPLORE CURRENT ALLOWANCES"}
            primaryButtonUrl={"https://track.decentri.fi/allowances"}
            imageSrc={Unicorn}
            showDecoratorBlob={false}
            features={
                [
                    {
                        Icon: DollarSign,
                        title: "Multi Chain",
                        description: "We check for allowances on all supported chains, like ethereum, optimism, base etc...",
                        iconContainerCss: tw`bg-purple-300 text-yellow-900`
                    },
                    {
                        Icon: DollarSign,
                        title: "All ERC20s",
                        description: "Next to base tokens, we also look for LP tokens, indexes etc.",
                        iconContainerCss: tw`bg-purple-300 text-yellow-800`
                    }
                ]
            }
        />
    )
}