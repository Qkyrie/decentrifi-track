import {useClaims} from "../../../../hooks/useClaims";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import React from "react";
import {useTransactions} from "../../../../hooks/useTransactions";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tw from "twin.macro";
import useWeb3 from "../../../../hooks/web3";
import {useHistory} from "react-router-dom";

const ButtonHolder = tw.div`w-full flex justify-end text-xs`

export default function ClaimButton({refreshClaimables, claimable}) {
    const web3 = useWeb3();
    const useClaim = useClaims();
    const transactions = useTransactions()
    const history = useHistory();

    async function requestNetworkChange(event) {
        event.stopPropagation();
        await transactions.validateChainId(claimable.network.chainId)
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


    if (!web3.active) {
        return <ButtonHolder>
            <PrimaryButton onClick={async (e) => {
                history.push("/dashboard")
            }} label="Connect"/>
            <ToastContainer closeOnClick={false} theme={'light'}/>
        </ButtonHolder>;
    } else if (transactions.isOnCorrectChain(claimable.network.chainId)) {
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
        </ButtonHolder>;
    }
};

