import tw from "twin.macro";
import React from "react";
import {SectionHeading, Subheading} from "../../../components/misc/Headings";
import {PrimaryButton} from "../../../components/misc/Buttons";
import {useHistory} from "react-router-dom";
import DollarLabel from "../../../components/Label/DollarLabel";

const Center = tw.div`grid justify-items-center py-5`
const PrimaryBackgroundContainer = tw.div`-mx-8 px-8 bg-primary-900 text-gray-100 mt-0 mb-10`;
const SubHeader = tw(Subheading)`text-center text-gray-500 mb-4`;
export default function ClaimableTeaser({amount, address}) {
    const history = useHistory();

    if (amount > 0.1) {
        return <PrimaryBackgroundContainer>
            <Center>
                <SectionHeading>You've got <DollarLabel amount={amount}/> in rewards.</SectionHeading>
                <SubHeader>You've got unclaimed yields waiting for you, which you can claim straight from this app!</SubHeader>
                <PrimaryButton onClick={() => {
                    history.push(`/${address}/claimables`)
                }
                } label={"CLAIM"}>CLAIM</PrimaryButton>
            </Center>
        </PrimaryBackgroundContainer>
    } else return <></>
};