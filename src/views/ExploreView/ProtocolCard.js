
import FallbackImage from "../../components/Image/FallbackImage";
import React from "react";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import {CurrencyDollarIcon} from "@heroicons/react/outline";

const Card = tw.div`lg:w-1/6 w-1/2 p-2 hover:-mt-1 hover:cursor-pointer`
const CardTop = tw.div`bg-black`
const CardBackground = styled.div(props => [
    `background-image: url("${props.imageSrc}");background-size: cover;`,
    tw`text-gray-100 h-16`
]);

const Blur = styled.div(props => [
    `backdrop-filter: blur(10px);`,
    tw`h-16 items-center  flex`
])

const Logo = tw.div`w-12 h-12 ml-2`

const CardBottom = tw.div`bg-gray-800 rounded-b-xl px-2 text-white flex flex-wrap w-full`
const Title = tw.div`w-full lowercase font-bold font-display`
const CardDetails = tw.div`w-full flex text-center items-center`

const CurrencyIcon = tw(CurrencyDollarIcon)`w-5 h-5`
const PullRight = tw.div`justify-self-end w-full text-right font-hairline text-sm`


export function ProtocolCard({stat}) {

    const history = useHistory();

    return <>
        <Card onClick={() => {
            history.push("/protocols/" + stat.protocol.slug)
        }
        }>
            <CardTop>
                <CardBackground imageSrc={stat.protocol.logo}>
                    <Blur>
                        <Logo>
                            <FallbackImage src={stat.protocol.logo}/>
                        </Logo>
                    </Blur>
                </CardBackground>
            </CardTop>
            <CardBottom>
                <Title>{stat.protocol.name}</Title>
                <CardDetails>
                    <CurrencyIcon/>
                    <PullRight>
                        <span>{stat.marketCount} {stat.marketCount === 1 ? 'market' : 'markets'}</span>
                    </PullRight>
                </CardDetails>

            </CardBottom>
        </Card>
    </>
}