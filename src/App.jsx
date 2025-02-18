import "tailwindcss/dist/base.css";
import "./styles/globalStyles.css";

// Path: src/styles/globalStyles.css
import React, {createContext, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AddressDashboardView from "./views/DashboardView/AddressDashboardView";
import TokenView from "./views/TokenView/TokenView";
import CustomHeader from "./components/Header/CustomHeader";
import Web3DashboardView from "./views/DashboardView/Web3DashboardView.jsx";
import FooterV2 from "./components/Footer/FooterV2";
import ReactGA from "react-ga4";
import ProtocolsView from "./views/ProtocolsView/ProtocolsView";
import ProtocolView from "./views/ProtocolsView/ProtocolView";
import ClaimableViewTeaser from "./views/ClaimableView/ClaimableViewTeaser";
import AddressClaimableView from "./views/ClaimableView/AddressClaimableView";
import useWeb3 from "./hooks/web3";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ExploreView from "./views/ExploreView/ExploreView";
import MembershipView from "./views/MembershipView";
import MentorshipView from "./views/MentorshipView/MentorshipView";
import GoerliFaucetView from "./views/GoerliFaucetView/GoerliFaucetView.jsx";
import {DashboardProvider} from "./views/DashboardProvider";

export const DashboardContext = createContext(null);


export default function App() {
    ReactGA.initialize([
        {
            trackingId: "G-WLP674G3V2"
        }
    ]);

    useEffect(() => {
        autoconnect()
    }, []);

    const queryClient = new QueryClient()
    const web3 = useWeb3();

    async function autoconnect() {
        if (web3.supported && !web3.active) {
            await web3.autoConnect();
        }
    }


    return (
        <QueryClientProvider client={queryClient}>
            <DashboardProvider>
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
                            <GoerliFaucetView/>
                        </Route>
                        <Route path="/explore">
                            <ExploreView/>
                            <FooterV2/>
                        </Route>
                        <Route path="/membership">
                            <MembershipView/>
                        </Route>
                        <Route path="/claimables">
                            <ClaimableViewTeaser/>
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
                        <Route path="/tokens/:network/:token">
                            <CustomHeader/>
                            <TokenView/>
                            <FooterV2/>
                        </Route>
                        <Route>
                            <Web3DashboardView/>
                            <FooterV2/>
                        </Route>
                    </Switch>
                </Router>
            </DashboardProvider>
        </QueryClientProvider>
    );
}
