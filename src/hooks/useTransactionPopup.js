import Popup from "reactjs-popup";
import React, {useState} from "react";
import tw from "twin.macro";
import {CheckCircleIcon, DotsCircleHorizontalIcon} from "@heroicons/react/solid";
import styled from "styled-components";

const Container = tw.div`grid w-full justify-items-center`;
const NextStepIcon = styled.div`
  ${tw`w-3 h-3 self-center mb-2`}
  svg {
    ${tw`ml-1 z-20 w-4 absolute`}
  }
`
const CloseContainer = tw.div`p-4 w-full`
const Header = tw.h1`text-lg font-black text-purple-600`

const TimeLine = tw.div`relative w-full mt-5 text-left mb-10`
const TimelineItem = tw.div`flex items-center relative py-4`
const TimelineState = tw.div`border-r-2 border-black absolute h-full ml-1 md:ml-8 mt-2 z-10 grid`
const TimelineDetails = styled.div`
  ${tw`ml-20`}
  div {
    ${tw`font-bold`}
  }
`

export default function useTransactionPopup() {

    const [open, setOpen] = useState(false);
    const [transactionState, setTransactionState] = useState(null);

    function getStateIcon(loadingState, finishedStates = []) {
        if (transactionState === loadingState) {
            return (
                <NextStepIcon>
                    <DotsCircleHorizontalIcon color={"orange"} />
                </NextStepIcon>
            )
        } else if (finishedStates.includes(transactionState)) {
            return (
                <NextStepIcon>
                    <CheckCircleIcon color={"green"} />
                </NextStepIcon>
            )
        }
        return (
            <NextStepIcon>
                <DotsCircleHorizontalIcon color={"gray"} tw="ml-1 z-20 w-4 absolute"/>
            </NextStepIcon>
        )
    }

    const closeModal = () => setOpen(false);

    const html = (
        <Popup closeOnDocumentClick={false} modal open={open} onClose={closeModal}>
            <Container>
                <CloseContainer>
                    <a className="close" onClick={closeModal}>
                        &times;
                    </a>
                </CloseContainer>
                <Header>Transaction Progress</Header>
                <TimeLine>
                    <TimelineItem>

                        <TimelineState>
                            {getStateIcon("signing", ["pending", "mined"])}
                        </TimelineState>

                        <TimelineDetails>
                            <div>Sign and submit your transaction</div>
                        </TimelineDetails>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineState>
                            {getStateIcon("pending", ["mined"])}
                        </TimelineState>

                        <TimelineDetails>
                            <div>Awaiting your transaction to be mined</div>
                        </TimelineDetails>
                    </TimelineItem>
                </TimeLine>
            </Container>
        </Popup>
    )

    return {
        html,
        setTransactionState,
        open: () => setOpen(true),
        close: () => setOpen(false),
    }
};

