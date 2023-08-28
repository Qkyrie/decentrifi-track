import FallbackImage from "../../components/Image/FallbackImage";
import React from "react";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import {AvatarResolver} from '@ensdomains/ens-avatar';
import {StaticJsonRpcProvider} from "@ethersproject/providers";
import {useQuery} from "@tanstack/react-query";


const Card = tw.div`lg:w-1/6 w-1/2 p-2 hover:-mt-1 hover:cursor-pointer`
const CardTop = tw.div`grid justify-items-center`
const CardBackground = styled.div(props => [
    tw`text-gray-100`
]);

const Logo = tw.div`w-32`

const CardBottom = tw.div`rounded-b-xl px-2 text-gray-600 grid justify-items-center`
const Title = tw.div`lowercase font-bold font-display text-center`

export function WhaleCard({whale}) {

    const history = useHistory();

    const imageQuery = useQuery({
        queryKey: ["image", whale.ens],
        queryFn: async () => {
            const avt = new AvatarResolver(new StaticJsonRpcProvider('https://eth.llamarpc.com'));
            let s = await avt.getAvatar(whale.ens, { /* jsdomWindow: jsdom (on nodejs) */});
            if (s === null) {
                return "https://metadata.ens.domains/preview/" + whale.ens
            } else {
                return s;
            }
        }
    });


    return <>
        <Card onClick={() => {
            history.push(whale.address + "/profile")
        }
        }>
            <CardTop>
                <CardBackground>
                    <Logo>
                        <FallbackImage src={imageQuery.data}/>
                    </Logo>
                </CardBackground>
            </CardTop>
            <CardBottom>
                <Title>{whale.ens}</Title>
            </CardBottom>
        </Card>
    </>
}