import MainFeature1 from "../components/features/TwoColWithButton";
import Features from "../components/features/ThreeColSimple";
import SupportIconImage from "../images/support-icon.svg";
import ShieldIconImage from "../images/shield-icon.svg";
import CustomerLoveIconImage from "../images/simple-icon.svg";
import React from "react";
import tw from "twin.macro";
import CustomHeader from "../components/Header/CustomHeader";
import FooterV2 from "../components/Footer/FooterV2";

import MembershipNft from "../images/membership_nft.png";
import ClaimHero from "../images/claim-browser.png";

const Subheading = tw.span`uppercase tracking-wider text-sm`;


export default function MembershipView() {
    return (
        <>
            <>
                <CustomHeader showSearch={false} showUserLink={false}/>
                <MainFeature1
                    description={
                        <p>
                            You want to be a member? Awesome! Becoming an early member of Decentri.fi will grant you
                            access to
                            a number of benefits, such as full access to the platform, early access to new features, and
                            more.
                        </p>
                    }
                    subheading={<Subheading>Membership</Subheading>}
                    heading="Become a member"
                    buttonRounded={false}
                    primaryButtonText="Explore the benefits"
                    primaryButtonUrl={"#benefits"}
                    imageSrc={ClaimHero}
                    imageShadow={true}
                    imageBorder={true}
                    imageRounded={true}
                />
                <MainFeature1
                    subheading={<Subheading>The Membership NFT</Subheading>}
                    heading="Hold this NFT and get access to the platform"
                    buttonRounded={false}
                    primaryButtonText="Buy the NFT"
                    description={
                        <div>
                            <p>Holding our membership NFT in your wallet grants you access to our exclusive features and
                                insights. Not using the membership? The NFT can be resold on the open market.</p>
                            <br/>
                            <p>Be one of the first supporters and get access to the platform. After our initial sale of early
                                bird
                                memberships, we'll venture out to
                                a new form of subscription, including a free, staked model.
                            </p>
                            <br/>
                            <p><b> Stay tuned for more information.</b></p>
                        </div>
                    }
                imageSrc={MembershipNft}
                primaryButtonUrl={"https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/59544766117376618043978085178500018507573765124387247653177172736636843196516"}
                imageShadow={true}
                textOnLeft={false}
                imageBorder={true}
                imageRounded={true}
                />
                <Features

                    subheading={
                        <div id="benefits">
                            <Subheading>Benefits</Subheading>
                        </div>
                    }
                    heading="Why become a member?"
                    description="We're still very early, but becoming a member will support us on our journey to build the best platform for exploring decentralized finance."
                    cards={[
                        {
                            imageSrc: SupportIconImage,
                            title: "Amazing Support",
                            description: "We actively listen to our members and work hard to build the best platform specifically tailored to your needs."
                        },
                        {
                            imageSrc: ShieldIconImage,
                            title: "Full Access",
                            description: "Get access to the entire platform, including finding all your claims, full history and our soon to be released suggestion engine."
                        },
                        {
                            imageSrc: CustomerLoveIconImage,
                            title: "Public Good Support",
                            description: "You'll be directly supporting our mission to build a better future for decentralized finance, including helping developers joining " +
                                "the ecosystem."
                        },
                    ]}
                    linkText=""
                />

                <FooterV2/>
            </>
            );
        </>
    )
};