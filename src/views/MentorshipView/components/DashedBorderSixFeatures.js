import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import {SectionHeading} from "components/misc/Headings.js";

import defaultCardImage from "images/shield-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";

import {ReactComponent as SvgDecoratorBlob3} from "images/svg-decorator-blob-3.svg";

import SupportIconImage from "images/support-icon.svg";
import CustomizeIconImage from "images/customize-icon.svg";
import FastIconImage from "images/fast-icon.svg";
import ReliableIconImage from "images/reliable-icon.svg";
import SimpleIconImage from "images/simple-icon.svg";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col mx-auto max-w-xs items-center px-6 py-10 border-2 border-dashed border-primary-500 rounded-lg mt-12`}
  .imageContainer {
    ${tw`border-2 border-primary-500 text-center rounded-full p-6 flex-shrink-0 relative`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-primary-500`}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default () => {
    const cards = [
        {
            imageSrc: ShieldIconImage,
            title: "Blockchain Basics",
            description: "Learn the fundamentals of blockchain technology and how it can be applied to different use cases."
        },
        {
            imageSrc: SupportIconImage,
            title: "Smart Contract Development",
            description: "Dive into the world of smart contracts and how to create them using various programming languages."
        },
        {
            imageSrc: CustomizeIconImage,
            title: "Decentralized Finance",
            description: "Explore the rapidly growing world of decentralized finance, including lending, borrowing, and trading on blockchain networks."
        },
        {
            imageSrc: ReliableIconImage,
            title: "Web3 Tooling",
            description: "Get familiar with the latest web3 tooling and infrastructure, including wallets, browsers, and development environments"
        },
        {
            imageSrc: FastIconImage,
            title: "Java/Kotlin Engineering",
            description: "Learn how to integrate your Java or Kotlin applications with blockchain networks and smart contracts"
        },
        {
            imageSrc: SimpleIconImage,
            title: "React",
            description: "Get up to speed with one of the most popular front-end JavaScript libraries, used to build responsive and dynamic user interfaces."
        },
        {
            imageSrc: SimpleIconImage,
            title: "Software Architecture",
            description: "Learn how to design and implement software systems that are scalable, maintainable, and robust, with a focus on blockchain and decentralized applications."
        },
        {
            imageSrc: SimpleIconImage,
            title: "Javascript Software Development",
            description: "Explore the world of JavaScript development, from the basics of the language to more advanced topics like server-side development and building full-stack applications."
        }
    ];

    return (
        <Container>
            <ThreeColumnContainer>
                <Heading>How <span tw="text-primary-500">WE</span> can <span
                    tw="text-primary-500">HELP YOU</span></Heading>
                {cards.map((card, i) => (
                    <Column key={i}>
                        <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt=""/>
              </span>
                            <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">
                  {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel."}
                </p>
              </span>
                        </Card>
                    </Column>
                ))}
            </ThreeColumnContainer>
            <DecoratorBlob/>
        </Container>
    );
};
