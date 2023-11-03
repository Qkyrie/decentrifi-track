import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {SectionHeading as HeadingTitle, Subheading} from "../../../components/misc/Headings.js";
import {PrimaryButton as PrimaryButtonBase} from "../../../components/misc/Buttons.js";
import SvgDecoratorBlob1 from "../../../images/svg-decorator-blob-1.svg?react";
import SvgDecoratorBlob2 from "../../../images/svg-decorator-blob-3.svg?react";

import Frontend from "../../../images/mentorship/frontend.png";
import Backend from "../../../images/mentorship/backend.png";
import Devops from "../../../images/mentorship/devops.png";
import {TagIcon, UserIcon} from "@heroicons/react/solid";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const ThreeColumn = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap`;
const Column = tw.div`mt-24 lg:w-1/3`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Card = tw.div`lg:mx-4 xl:mx-8 max-w-sm flex flex-col h-full`;
const Image = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`bg-cover bg-center h-80 lg:h-64 rounded rounded-b-none`
]);

const Details = tw.div`p-6 rounded border-2 border-t-0 rounded-t-none border-dashed border-primary-100 flex-1 flex flex-col items-center text-center lg:block lg:text-left`;
const MetaContainer = tw.div`flex items-center`;
const Meta = styled.div`
  ${tw`text-secondary-100 font-medium text-sm flex items-center leading-none mr-6 last:mr-0`}
  svg {
    ${tw`w-4 h-4 mr-1`}
  }
`;

const Title = tw.h5`mt-4 leading-snug font-bold text-lg`;
const Description = tw.p`mt-2 text-sm text-secondary-100`;
const Link = styled(PrimaryButtonBase).attrs({as: "a"})`
  ${tw`inline-block mt-4 text-sm font-semibold`}
`

const DecoratorBlob1 = tw(
    SvgDecoratorBlob1
)`-z-10 absolute bottom-0 right-0 w-48 h-48 transform translate-x-40 -translate-y-8 opacity-25`;
const DecoratorBlob2 = tw(
    SvgDecoratorBlob2
)`-z-10 absolute top-0 left-0 w-48 h-48 transform -translate-x-32 translate-y-full opacity-25`;

export default ({
                    subheading = "our work",
                    heading = <>We Love <span tw="text-primary-500">Writing Code.</span></>,
                    description =
                        <span>Here are some projects we created and are proud of. <br/>All are open source, so you can help us make them even better by contributing to the projects.</span>,

                }) => {
    const work = [
        {
            imageSrc: Frontend,
            author: "Quinten De Swaef",
            category: "React Js",
            title: "Decentrifi Frontend",
            description: "A React js frontend to interact with the Decentrifi Defi Hub. Also the landing pages and tools.",
            url: "https://decentri.fi"
        },
        {
            imageSrc: Backend,
            author: "Quinten De Swaef",
            category: "Kotlin",
            title: "Defi Hub, the backend.",
            description: "Defi Hub. The entire backend that powers all of our projects. The core of defi hub is a kotlin backend that is used to interact with the blockchain and map it to defi primitives..",
            url: "https://github.com/decentri-fi/defi-hub"
        },
        {
            imageSrc: Devops,
            author: "Quinten De Swaef",
            category: "Devops",
            title: "Decentrifi, the infra",
            description: "Everything decentrifi runs on. From the kubernetes clusters to the databases and the CI/CD pipelines. All of it is managed by terraform.",
            url: "https://github.com/decentri-fi/infrastructure"
        }

    ];
    return (
        <Container>
            <Content>
                <HeadingInfoContainer>
                    {subheading && <Subheading>{subheading}</Subheading>}
                    <HeadingTitle>{heading}</HeadingTitle>
                    <HeadingDescription>{description}</HeadingDescription>
                </HeadingInfoContainer>
                <ThreeColumn>
                    {work.map((post, index) => (
                        <Column key={index}>
                            <Card>
                                <Image imageSrc={post.imageSrc}/>
                                <Details>
                                    <MetaContainer>
                                        <Meta>
                                            <UserIcon/>
                                            <div>{post.author}</div>
                                        </Meta>
                                        <Meta>
                                            <TagIcon/>
                                            <div>{post.category}</div>
                                        </Meta>
                                    </MetaContainer>
                                    <Title>{post.title}</Title>
                                    <Description>{post.description}</Description>
                                    <Link href={post.url}>Read Post</Link>
                                </Details>
                            </Card>
                        </Column>
                    ))}
                </ThreeColumn>
            </Content>
            <DecoratorBlob1/>
            <DecoratorBlob2/>
        </Container>
    );
};
