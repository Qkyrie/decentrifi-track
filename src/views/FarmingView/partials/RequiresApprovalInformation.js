import React from 'react';
import tw from "twin.macro";

const Container = tw.div`bg-white`;
const Center = tw.div`lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20`
const TitleContainer = tw.h2`text-3xl font-extrabold text-black sm:text-4xl`

const Indigo = tw.span`underline block text-indigo-500`

export default function RequiresApprovalInformation() {
    return <Container>
        <Center>
            <TitleContainer>
                <div>
                    You haven't given this specific contract access yet to asset.
                </div>
                <Indigo>
                    Why is this necessary?
                </Indigo>
            </TitleContainer>
        </Center>
    </Container>;
}