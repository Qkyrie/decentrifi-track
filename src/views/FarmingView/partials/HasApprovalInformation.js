import React from 'react';
import {CheckIcon} from "@heroicons/react/solid";
import tw from "twin.macro";

const Container = tw.div``
const Header = tw.h2`text-xl font-extrabold text-black sm:text-2xl flex-col flex items-center justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20`
const Message = tw.span`block`
const CenterIcon = tw.span`flex justify-center`
const Disclaimer = tw.span`underline text-center block text-indigo-500`

const GreenCheckIcon = tw(CheckIcon)`h-16 text-green-600`

export default function HasApprovalInformation() {
    return <Container>
        <Header>
            <Message>
                You have given approval to move your tokens around.
            </Message>
            <CenterIcon>
                <GreenCheckIcon/>
            </CenterIcon>
            <Disclaimer>
                Why was this necessary?
            </Disclaimer>
        </Header>
    </Container>;
}