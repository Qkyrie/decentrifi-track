import React, {useEffect} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Hero from "./components/BackgroundAsImage.js";
import Features from "./components/DashedBorderSixFeatures";
import MainFeature from "components/features/TwoColSingleFeatureWithStats2.js";
import OurWork from "./components/our-work.js";
import FAQ from "components/faqs/SimpleWithSideImage.js";
import ContactUsForm from "./components/get-in-touch.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import customerSupportIllustrationSrc from "images/customer-support-illustration.svg";
import CustomHeader from "../../components/Header/CustomHeader";

export default () => {

    useEffect(() => {
        window.title = "Join our free Java & Web3 Mentorship Program | Decentri.fi";
    }, []);

    return (

        <AnimationRevealPage>
            <CustomHeader expanded={false}/>

            <Hero/>
            <MainFeature statistics={[]} heading={
                <span>We have been doing this for <span tw="text-primary-500">over a decade.</span></span>
            }
                         description={<span>Next to our daily software engineering tasks, we also decide to give back to the community, helping out starting developers in their adventure.
            <br/><br/>Enter our membership program.</span>}
                         primaryButtonText={"Join Us"}
                         primaryButtonUrl={"https://discord.gg/BdbhdTA8"}
                         secondaryButtonText={"See our work"}
                         secondaryButtonUrl={"https://github.com/decentri-fi"}
            />
            <Features/>
            {
                /*

            <MainFeature2/>
             <Portfolio/>
                 */
            }

            <FAQ
                imageSrc={customerSupportIllustrationSrc}
                imageContain={true}
                imageShadow={false}
                subheading="FAQs"
                description={"Do you have questions ? We have got answers to some commonly asked questions."}
                faqs={[
                    {
                        question: "Is this a free mentorship?",
                        answer:
                            "Yes, we do not charge for our mentorship. We do this for the community. In the future, we will release courses,which will be paid, but the mentorship will always be free."
                    },
                    {
                        question: "How can I join?",
                        answer: "You can join our discord server and ask for help there. We will try to help you as soon as possible."
                    },
                    {
                        question: "Can anyone join?",
                        answer: "Yes, anyone can join. We are open to everyone without any discrimination or prejudice. You can be a student, beginning software engineer or seasoned developer with questions."
                    }
                ]}
                heading={
                    <>
                        Do you have <span tw="text-primary-500">Questions ?</span>
                    </>
                }
            />
            <OurWork/>
            <ContactUsForm/>
            <Footer/>
        </AnimationRevealPage>
    );
};
