import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

import {SectionHeading} from "../../components/misc/Headings.js";

import defaultCardImage from "../../images/shield-icon.svg";

import SvgDecoratorBlob3 from "../../images/svg-decorator-blob-3.svg?react";
import {SuggestionMapper} from "./SuggestionMapper";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`mx-4 flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-4 md:py-4`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/4 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col mx-auto max-w-xs items-center px-6 py-10 border-2 border-dashed border-green-500 rounded-lg mt-12`}
  .imageContainer {
    ${tw`border-2 border-green-500 text-center rounded-full p-6 flex-shrink-0 relative`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-green-500`}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose `}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default ({suggestions}) => {

    const suggestionMapper = new SuggestionMapper();

    const cards = suggestions.map((suggestion) => {
        return suggestionMapper.map(suggestion)
    }).filter((card) => card !== null);

    return (
        <Container>
            <ThreeColumnContainer>
                <Heading>Your Portfolio <span tw="text-green-500">Suggestions</span></Heading>
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
