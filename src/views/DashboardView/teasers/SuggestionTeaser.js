import React from "react";

import {useHistory} from "react-router-dom";
import {SectionHeading, Subheading} from "../../../components/misc/Headings";
import {SuccessButton} from "../../../components/misc/Buttons";
import tw from "twin.macro";

const Center = tw.div`grid justify-items-center py-5`
const PrimaryBackgroundContainer = tw.div`-mx-8 px-8 bg-green-700 text-white -mt-8 mb-4`;
const SubHeader = tw(Subheading)`text-center text-gray-100 mb-4`;

export default function ({amount, address}) {
    const history = useHistory();

    if (amount > 0) {
        const multipleSuggestions = amount > 1;
        return <PrimaryBackgroundContainer>
            <Center>
                <SectionHeading>{amount} suggestion{multipleSuggestions && "s"}</SectionHeading>
                <SubHeader>Account analyzed. We've detected {amount} suggestion{multipleSuggestions && "s"} related to
                    your current
                    positions.</SubHeader>
                <SuccessButton onClick={() => {
                    history.push(`/${address}/suggestions`)
                }
                } label={"SHOW SUGGESTIONS"}>SHOW SUGGESTIONS</SuccessButton>
            </Center>
        </PrimaryBackgroundContainer>
    } else return <>
    </>
};