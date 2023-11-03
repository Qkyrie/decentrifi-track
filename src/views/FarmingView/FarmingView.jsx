import React, {useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {useFarmingViewHooks} from "./hooks/farmingViewHooks";
import Actions from "./partials/Actions";
import ChangeNetworkSection from "../../components/ChangeNetworkSection/ChangeNetworkSection";
import PositionInformation from "./partials/PositionInformation";
import useWeb3 from "../../hooks/web3";
import ReactGA from "react-ga4";

export default function FarmingView({farmingElement, token}) {

    const farmingViewHooks = useFarmingViewHooks(farmingElement);
    const {hasAccount} = useWeb3();

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }, [])


    return (
        <>
            <PositionInformation farmingViewHooks={farmingViewHooks} farmingElement={farmingElement} />
            {
                farmingElement.prepareInvestmentSupported &&
                <Actions farmingViewHooks={farmingViewHooks} token={token} farmingElement={farmingElement}/>
            }
        </>
    )
};