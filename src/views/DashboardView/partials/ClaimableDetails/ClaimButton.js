import {useClaims} from "../../../../hooks/useClaims";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import React from "react";
import {useTransactions} from "../../../../hooks/useTransactions";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClaimButton({refreshClaimables, claimable}) {
    const useClaim = useClaims();
    const transactions = useTransactions()

    const claimFn = claimingFunction();


    function claimingFunction() {

        return async (event) => {
            event.stopPropagation();
            try {
                toast("Signing transaction to claim tokens.")
                const result = await useClaim.claim(claimable);
                toast.dismiss();
                if (result !== undefined) {
                    toast.promise(
                        result.wait(),
                        {
                            pending: "Transaction submitted, awaiting confirmation.",
                            success: "Your rewards were successfully claimed, refreshing them",
                        }
                    ).then(() => {
                        refreshClaimables();
                    });
                } else {

                }
            } catch (err) {
                transactions.handleErrorResult(err).then(() => {
                })
            }
        };
    }

    if ( transactions.isOnCorrectChain(claimable.network.chainId)) {
        return (
            <>
                <PrimaryButton onClick={async (e) => {
                    await claimFn(e);
                }} label="Claim"/>
                <ToastContainer closeOnClick={false} theme={'light'}/>
            </>
        );
    } else  {
        return <>
            <PrimaryButton onClick={async (e) => {
                await claimFn(e);
            }} label="Change Network"/>
        </>
    }
};

