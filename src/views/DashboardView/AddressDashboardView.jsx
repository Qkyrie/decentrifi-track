import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import DashboardView from "./DashboardView";
import CustomHeader from "../../components/Header/CustomHeader";

export default function AddressDashboardView() {

    const params = useParams();
    const address = params.user;
    const history = useHistory();


    const onAddressChange = (address) => {
        history.push(`/${address}/profile`);
    };

    return (
        <>
            <CustomHeader onAddressChange={onAddressChange} showSearch={true}></CustomHeader>
            <DashboardView address={address}/>
        </>
    )
};