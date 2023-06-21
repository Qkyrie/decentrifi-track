import useWeb3 from "../../../../hooks/web3";
import {useClaims} from "../../../../hooks/useClaims";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import React from "react";
import swal from "sweetalert";
import tw from "twin.macro";
import useTransactionPopup from "../../../../hooks/useTransactionPopup";

export default function ClaimButton({refreshClaimables, claimable}) {
    const web3 = useWeb3();
    const claim = useClaims(web3)

    const {
        html: transactionPopup,
        setTransactionState,
        open,
        close
    } = useTransactionPopup();

    const claimFn = claimingFunction(claim, claimable, refreshClaimables, setTransactionState, close);

    return (
        <>
            <PrimaryButton onClick={async (e) => {
                open();
                await claimFn(e);
            }} label="Claim"/>
            {transactionPopup}
        </>
    );
};

function claimingFunction(claimHook, claimable, refreshClaimables, setState, close) {

    const claim = async (e) => {
        e.stopPropagation();
        try {
            setState("signing");
            const result = await claimHook.claim(claimable);
            setState("pending")
            result.wait().then(() => {
                swal({
                    text: "Your rewards were successfully claimed, refreshing them.",
                    icon: "success"
                });
                setState("mined")
                close();
                refreshClaimables();
            });
        } catch (err) {
            swal({
                text: err.message,
                icon: "error"
            });
            close();
        }
    };

    return claim;
}