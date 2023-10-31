import PrimaryButton from "../../../components/Button/PrimaryButton";
import React, {useState} from "react";

import tw from "twin.macro";
import styled from "styled-components";
import {useTransactions} from "../../../hooks/useTransactions";
import {toast, ToastContainer} from "react-toastify";
import {useERC20} from "../../../hooks/erc20/useERC20";
import {Input} from "@mui/material";
import AboutUs from "../../AboutUs";
import Pricing from "../../../pages/Pricing";
import GetStarted from "../../../components/cta/GetStarted";
import useWeb3 from "../../../hooks/web3";


const Container = styled.div`
  ${tw`mb-2 pt-2 text-gray-600 flex flex-nowrap w-full`}
  input {
    ${tw`w-11/12 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none`}
  }
`

export function SendERC20({token, userBalance, refresh}) {


    const [addressField, setAddressField] = useState("");
    const [amountField, setAmountField] = useState(0);
    const web3 = useWeb3();


    const transactions = useTransactions();
    const erc20 = useERC20();

    async function requestNetworkChange(event) {
        event.stopPropagation();
        await transactions.validateChainId(token.network.chainId)
    }

    function setFull() {
        setAmountField(userBalance);
    }

    async function sendIt() {
        if (addressField === null || addressField === undefined || addressField.length !== 42) {
            toast("Please use a valid address to send tokens to.", {type: "error"})
            return;
        }
        if (amountField === null || amountField === undefined || amountField.length === 0) {
            toast("Please use a valid amount of tokens to send.", {type: "error"})
            return;
        }

        if (amountField > userBalance) {
            toast("You do not have enough tokens to send.", {type: "error"})
            return;
        }

        try {
            toast("Signing transaction to send tokens.");
            const result = await erc20.transfer(token, addressField, amountField);
            toast.dismiss();
            if (result !== undefined) {
                toast.promise(
                    result.wait(),
                    {
                        pending: "Transaction submitted, awaiting confirmation.",
                        success: "Your tokens were successfully sent. Refreshing balance.",
                    }
                ).then(() => {
                    //refresh balance
                    refresh();
                });
            }
        } catch (err) {
            await transactions.handleErrorResult(err)
        }
    }

    function onAddressChange(e) {
        setAddressField(e.target.value);
    }

    function onAmountChange(e) {
        setAmountField(e.target.value);
    }

    const isOnCorrectChain = transactions.isOnCorrectChain(token.network.chainId);

    return (
        <div tw="w-full grid justify-items-center py-4 my-4">
            <ToastContainer closeOnClick={false} theme={'light'}/>
            <div tw="w-2/3 lg:w-1/3 border-blue-100 bg-purple-200 rounded-xl">
                <div tw="grid justify-items-center mt-4">
                    <h4 tw="text-gray-600 font-bold">Send ERC20 Tokens</h4>
                </div>

                <div tw="flex flex-row mt-6">
                    <div tw="mx-2 text-right w-2/12 self-center">
                        To:
                    </div>
                    <div tw="w-10/12 mx-2">
                        <div tw="grid justify-items-end ml-4">
                            <Container>
                                <input onChange={onAddressChange} type="text" name="to" placeholder="0x0"/>
                            </Container>
                        </div>
                    </div>
                </div>

                <div tw="flex">
                    <div tw="flex-col mx-2 mt-4 text-right w-2/12">
                        Amount:
                        <div>
                            <PrimaryButton onClick={setFull} label={"max"}></PrimaryButton>
                        </div>
                    </div>
                    <div tw="w-10/12 mx-2">
                        <div tw="grid justify-items-end ml-4">
                            <Container>
                                <Input value={amountField} onChange={onAmountChange} type="number" name="amount"
                                       placeholder="0.00"/>
                            </Container>
                        </div>
                    </div>
                </div>
                <div tw="flex justify-items-center grid mb-6">
                    {
                        isOnCorrectChain && <PrimaryButton label="send" onClick={sendIt}/>
                    }
                    {
                        !isOnCorrectChain && <PrimaryButton label="change network" onClick={requestNetworkChange}/>
                    }
                </div>
            </div>
        </div>
    )
}