import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

// Path: src/styles/globalStyles.css
import React, {createContext, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

/*
 * This is the entry point component of this project. You can change the below exported default App component to any of
 * the prebuilt landing page components by uncommenting their import and export lines respectively.
 * See one of the landing page components to better understand how to import and render different components (Always
 * make sure if you are building your own page, the root component should be the AnimationRevealPage component. You can
 * disable the animation by using the disabled prop.
 *
 * The App component below is using React router to render the landing page that you see on the live demo website
 * and the component previews.
 *
 */
import AddressDashboardView from "./views/DashboardView/AddressDashboardView";
import TokenView from "../src/views/TokenView/TokenView";
import StakingView from "../src/views/StakingView/StakingView";
import PoolingView from "../src/views/PoolingView";
import CustomHeader from "./components/Header/CustomHeader";
import LandingView from "./views/LandingView/LandingView";
import Web3DashboardView from "./views/DashboardView/Web3DashboardView.js";
import FooterV2 from "./components/Footer/FooterV2";
import ReactGA from "react-ga4";
import ConnectView from "./views/ConnectView/ConnectView";
import ProtocolsView from "./views/ProtocolsView/ProtocolsView";
import ServiceLandingPage from "./demos/ServiceLandingPage";
import ProtocolView from "./views/ProtocolsView/ProtocolView";
import TermsOfServiceView from "./views/TermsOfServiceView/TermsOfServiceView";
import Web3ClaimableView from "./views/ClaimableView/Web3ClaimableView";
import AddressClaimableView from "./views/ClaimableView/AddressClaimableView";
import useWeb3 from "./hooks/web3";
import HistoryView from "./views/HistoryView/HistoryView";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ExploreView from "./views/ExploreView/ExploreView";
import MembershipView from "./views/MembershipView";
import {ApprovalView} from "./views/ApprovalView/ApprovalView";
import SuggestionView from "./views/SuggestionView/SuggestionView";
import MentorshipView from "./views/MentorshipView/MentorshipView";
import GoerliFaucetView from "./views/GoerliFaucetView/GoerliFaucetView.js";

export const DashboardContext = createContext(null);

export default function App() {
    ReactGA.initialize([
        {
            trackingId: "G-WLP674G3V2"
        }
    ]);

    const queryClient = new QueryClient()
    const web3 = useWeb3();

    useEffect(async () => {
        if (web3.supported && !web3.active) {
            await web3.autoConnect();
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>

            <Router>
                <Switch>
                    <Route path="/dashboard">
                        <Web3DashboardView/>
                        <FooterV2/>
                    </Route>
                    <Route path={"/mentorship"}>
                        <MentorshipView/>
                    </Route>
                    <Route path={"/goerli-faucet"}>
                        <GoerliFaucetView />
                    </Route>
                    <Route path="/explore">
                        <ExploreView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/membership">
                        <MembershipView/>
                    </Route>
                    <Route path="/claimables">
                        <Web3ClaimableView/>
                        <FooterV2/>
                    </Route>
                    <Route exact path="/protocols">
                        <CustomHeader/>
                        <ProtocolsView/>
                        <FooterV2/>
                    </Route>
                    <Route exact path="/protocols/:protocol">
                        <CustomHeader/>
                        <ProtocolView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/defi-hub">
                        <CustomHeader showUserLink={false}/>
                        <ConnectView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/terms-of-service">
                        <CustomHeader showUserLink={false}/>
                        <TermsOfServiceView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/test">
                        <ServiceLandingPage/>
                    </Route>
                    <Route path="/:user/allowance">
                        <ApprovalView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/:user/suggestions">
                        <SuggestionView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/:user/profile">
                        <AddressDashboardView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/account/:user">
                        <AddressDashboardView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/:user/claimables">
                        <AddressClaimableView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/:user/history">
                        <HistoryView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/tokens/:network/:token">
                        <CustomHeader/>
                        <TokenView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/staking/:network/:protocol/:selectedStakingId">
                        <CustomHeader/>
                        <StakingView/>
                        <FooterV2/>
                    </Route>
                    <Route exact path="/pooling/:network/:protocol/:selectedPoolingMarketId">
                        <CustomHeader/>
                        <PoolingView/>
                        <FooterV2/>
                    </Route>
                    <Route>
                        <CustomHeader expanded={true} showUserLink={false}/>
                        <LandingView/>
                        <FooterV2/>
                    </Route>
                </Switch>
            </Router>
        </QueryClientProvider>
    );
}
