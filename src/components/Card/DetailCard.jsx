import React from "react";
import tw from "twin.macro"

const Container = tw.div`flex mb-2 mx-2`
const Border = tw.div`shadow-md hover:shadow-lg  w-full p-2 bg-white`
const Center = tw.div`flex items-center`

const TitleText = tw.p`text-sm text-gray-800`
const BoldText = tw.p`text-gray-800 text-sm font-bold`
const Icon = tw.div`mr-2`
const PullRight = tw.div`flex grid justify-items-end text-right`
const Title = tw.div`flex w-1/2`
const Number = tw.div`w-1/2`
export default function DetailCard({centerHtml, title, icon, bottomHtml = <></>}) {
    return (
        <Container>
            <Border>
                <Center>
                    <Icon>
                        {icon}
                    </Icon>
                    <Title>
                        <TitleText>
                            {title}
                        </TitleText>

                    </Title>
                    <Number>
                        <PullRight>
                            <div>
                                <BoldText>
                                    {centerHtml}
                                </BoldText>
                            </div>
                        </PullRight>
                    </Number>
                </Center>
                {bottomHtml}
            </Border>
        </Container>
    )
};