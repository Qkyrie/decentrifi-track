import Popup from "reactjs-popup";
import React, {useState} from "react";
import tw from "twin.macro";
import {CheckCircleIcon, DotsCircleHorizontalIcon} from "@heroicons/react/solid";
import styled from "styled-components";

const Container = tw.div`grid w-full justify-items-center`;
const NextStepIcon = styled.div`
  ${tw`w-5 h-5  mb-2`}
  svg {
    ${tw`ml-1 z-20 w-8 absolute`}
  }
`
const CloseContainer = tw.div`p-4 w-full`
const Header = tw.h1`text-lg font-black text-purple-600`

const TimeLine = tw.div`relative w-full mt-5 text-left mb-10`
const TimelineItem = tw.div`flex items-center relative py-4`
const TimelineState = tw.div`absolute h-full ml-1 md:ml-8 mt-2 z-10`
const TimelineDetails = styled.div`
  ${tw`ml-20`}
  div {
    ${tw`font-bold align-top`}
  }
`

export default function useTransactionState() {

    const [transactionState, setTransactionState] = useState(null);

    return {
        setTransactionState,
    }
};

