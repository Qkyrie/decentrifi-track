import React, {useEffect} from 'react';
import PositionInformation from "./partials/PositionInformation";
import usePoolingViewHooks from "./hooks/poolingview-hooks";
import PoolingOpportunities from "../../components/PoolingOpportunities/PoolingOpportunities";
import tw from "twin.macro";
import ReactGA from "react-ga4";

export default function PoolingView() {
    const poolingViewHooks = usePoolingViewHooks()

    const {
        activePoolingElement,
    } = poolingViewHooks

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])


    const detail = function () {
        if (activePoolingElement !== null) {
            return (
                <>
                    <PositionInformation poolingMarketElement={activePoolingElement}
                                         poolingViewHooks={poolingViewHooks}/>
                    <PoolingOpportunities poolingOpportunities={poolingViewHooks.alternativePoolingMarkets}
                                          title="Alternative Pooling Opportunities"/>
                </>
            );
        } else {
            return (
                <></>
            );
        }
    }();

    return <>
        <div tw="mx-4 mt-4 flex flex-wrap lg:mx-64">
            {detail}
        </div>
    </>;
};