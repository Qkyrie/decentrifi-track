import swal from "sweetalert";
import {Button} from "@mui/material";
import React, {useState} from "react";
import useWeb3 from "../../../../hooks/web3";
import {useExitPosition} from "../../../../hooks/useExitPosition";
import tw from "twin.macro";
import spinner from "../../../../images/spinner.gif";
import styled from "styled-components";
import {useTransactions} from "../../../../hooks/useTransactions";
import {toast, ToastContainer} from "react-toastify";

const ButtonContent = styled.div`
  ${tw`flex flex-row`}
  span {
    ${tw`align-middle`}
    img {
      ${tw`h-5`}
    }
  }

  span {
    ${tw`mx-3 align-middle`}
  }
`

export function ExitButton({element}) {

    const transactions = useTransactions()
    const {
        doExit
    } = useExitPosition();

    async function requestNetworkChange(event) {
        event.stopPropagation();
        await transactions.validateChainId(element.network.chainId)
    }

    async function exit(event) {
        event.stopPropagation();
        try {
            toast("Signing transaction to claim tokens.")
            const result = await doExit(element);
            toast.dismiss();
            if (result !== undefined) {
                toast.promise(
                    result.wait(),
                    {
                        pending: "Transaction submitted, awaiting confirmation.",
                        success: "Your rewards were successfully claimed, refreshing them",
                    }
                ).then(() => {
                    console.log('done')
                });
            }
        } catch (err) {
            transactions.handleErrorResult(err).then(() => {
            })
        }
    }


    return (
        <Button onClick={exit} variant={"contained"}>
            <ButtonContent>
                <span>Exit Position</span>
                <ToastContainer closeOnClick={false} theme={'light'}/>
            </ButtonContent>
        </Button>
    )
}