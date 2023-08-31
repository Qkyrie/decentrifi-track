import {useClaims} from "../../../../hooks/useClaims";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import React from "react";
import {useTransactions} from "../../../../hooks/useTransactions";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tw from "twin.macro";

const ButtonHolder = tw.div`w-full flex justify-end text-xs`

export default function ClaimButton({refreshClaimables, claimable}) {
    const useClaim = useClaims();
    const transactions = useTransactions()

    async function requestNetworkChange(event) {
        event.stopPropagation();
        const result = await transactions.validateChainId(claimable.network.chainId)
    }

    async function claim(event) {
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
            }
        } catch (err) {
            transactions.handleErrorResult(err).then(() => {
            })
        }
    }

    if (transactions.isOnCorrectChain(claimable.network.chainId)) {
        return (
            <ButtonHolder>
                <PrimaryButton onClick={async (e) => {
                    await claim(e);
                }} label="Claim"/>
                <ToastContainer closeOnClick={false} theme={'light'}/>
            </ButtonHolder>
        );
    } else {
        return <ButtonHolder>
            <PrimaryButton onClick={async (e) => {
                await requestNetworkChange(e);
            }} label="Change Network"/>
            <ToastContainer closeOnClick={false} theme={'light'}/>
        </ButtonHolder>
    }
};

