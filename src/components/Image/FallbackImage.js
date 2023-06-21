import React from 'react';
import tw from 'twin.macro'
import FallbackImg from "../../images/fallback.png"

const MaxWidthObject = tw.object`w-full`;
const MaxWidthImg = tw.img`w-full`;


export default function FallbackImage({src}) {

    return (
        <MaxWidthObject data={src} type="image/png">
            <MaxWidthImg alt="logo" src={FallbackImg}/>
        </MaxWidthObject>
    )
};