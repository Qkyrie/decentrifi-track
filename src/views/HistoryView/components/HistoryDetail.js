import React, {useMemo} from "react";

import tw from "twin.macro";
import {HistoryDetailMapper} from "../hooks/useHistoryDetailMapper";

const Wrapper = tw.div`w-full flex grid justify-items-center`
const Container = tw.div`w-full my-2 py-2 rounded-lg`

const historyDetailMapper = new HistoryDetailMapper();

export default function HistoryDetail({event, owner}) {


    const details = useMemo(() => {
        return historyDetailMapper.map(event, owner)
    }, [event, owner])

    if (details == null) {
        return <></>
    }

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





