import React, {useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import ClaimableView from "./ClaimableView";
import CustomHeader from "../../components/Header/CustomHeader";

export default function AddressClaimableView() {

    const params = useParams();
    const address = params.user;
    const history = useHistory();

    useEffect(() => {
        document.title = `Claimables for ${address} - Decentrifi`;
    }, []);

    const onAddressChange = (address) => {
        history.push(`/${address}/claimables`);
    };

    return (
        <>
            <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
            <ClaimableView address={address}/>
        </>
    )
};