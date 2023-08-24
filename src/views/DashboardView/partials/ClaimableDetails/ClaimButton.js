import {useClaims} from "../../../../hooks/useClaims";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import React from "react";
import swal from "sweetalert";
import useTransactionPopup from "../../../../hooks/useTransactionPopup";
import {useTransactions} from "../../../../hooks/useTransactions";

export default function ClaimButton({refreshClaimables, claimable}) {
    const useClaim = useClaims();
    const transactions = useTransactions()

    const {
        html: transactionPopup,
        setTransactionState,
        open,
        close
    } = useTransactionPopup();

    const claimFn = claimingFunction();

    function claimingFunction() {

        return async (event) => {
            event.stopPropagation();
            try {
                setTransactionState("signing");
                const result = await useClaim.claim(claimable);
                setTransactionState("pending")
                if (result !== undefined) {
                    result.wait().then(() => {
                        swal({
                            text: "Your rewards were successfully claimed, refreshing them.",
                            icon: "success"
                        });
                        setTransactionState("mined");
                        refreshClaimables();
                        close();
                    });
                } else  {
                    close();
                }
            } catch (err) {
                transactions.handleErrorResult(err).then(() => {
                    close();
                })
            }
        };
    }

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

