import React from "react";
import TransferDetail from "./TransferDetail";

import tw from "twin.macro";
import ApprovalDetail from "./ApprovalDetail";

const Wrapper = tw.div`w-full flex grid justify-items-center`
const Container = tw.div`w-full my-2 py-2 rounded-lg`

export default function HistoryDetail({event, owner}) {

    const result = function toDetail() {
        if (event.type === "TRANSFER") {
            return TransferDetail({event, owner});
        } else if (event.type === "APPROVAL") {
            return ApprovalDetail({event, owner});
        } else {
            return null
        }
    }()

    if (result == null) {
        return <></>
    }

    return (
        <Wrapper>
            <Container>
                {
                   result
                }
            </Container>
        </Wrapper>
    );

};





