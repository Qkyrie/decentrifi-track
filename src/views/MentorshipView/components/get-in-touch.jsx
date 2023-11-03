import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {SectionHeading, Subheading as SubheadingBase} from "../../../components/misc/Headings.js";
import EmailIllustrationSrc from "../../../images/email-illustration.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
    tw`md:w-7/12 mt-16 md:mt-0`,
    props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

export default ({
                    image = EmailIllustrationSrc,
                    subheading = "Contact Us",
                    heading = <>Feel free to <span tw="text-primary-500">get in touch</span>
                        <wbr/>
                        with us.</>,
                    description = "Everything happens on our discord. Be among the first to join our discord server and get notified about the latest updates.",
                    submitButtonText = "Contact Me",
                    formAction = "#",
                    formMethod = "get",
                    textOnLeft = true,
                }) => {
    // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

    return (
        <Container>
            <TwoColumn>
                <ImageColumn>
                    <Image imageSrc={image}/>
                </ImageColumn>
                <TextColumn textOnLeft={textOnLeft}>
                    <TextContent>
                        {subheading && <Subheading>{subheading}</Subheading>}
                        <Heading>{heading}</Heading>
                        <Description>{description}</Description>
                    </TextContent>
                </TextColumn>
            </TwoColumn>
        </Container>
    );
};
