import React, {useMemo} from "react";

import tw from "twin.macro";
import {HistoryDetailMapper} from "../hooks/useHistoryDetailMapper";

const Wrapper = tw.div`w-full flex grid justify-items-center`
const Container = tw.div`w-full rounded-lg`

const historyDetailMapper = new HistoryDetailMapper();

export default function HistoryDetail({event, owner, index}) {


    const details = useMemo(() => {
        return historyDetailMapper.map(event, owner, index)
    }, [event, owner, index])

    return (
        <Wrapper>
            <Container>
                {
                    details
                }
            </Container>
        </Wrapper>
    );

};





