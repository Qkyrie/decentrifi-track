import React from "react";
import tw from "twin.macro";

const GreenButton = tw.button`bg-green-500 text-white font-semibold border rounded py-2 px-4 hover:bg-transparent hover:text-green-700 hover:border-green-400`

export default function PrimaryButton({onClick, label}) {
    return (
        <GreenButton onClick={onClick}>{label}</GreenButton>
    )
};