import React, {useMemo} from "react";
import TransferDetail from "./TransferDetail";

import tw from "twin.macro";
import ApprovalDetail from "./ApprovalDetail";
import {HistoryDetailMapper, useHistoryDetailMapper} from "../hooks/useHistoryDetailMapper";

const Wrapper = tw.div`w-full flex grid justify-items-center`
const Container = tw.div`w-full my-2 py-2 rounded-lg`

export default function HistoryDetail({event, owner}) {

    const historyDetailMapper = useMemo(() => new HistoryDetailMapper(), []);

    const result = useMemo(() =>  {
        return historyDetailMapper.map(event, owner)
    }, [event, owner])

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





