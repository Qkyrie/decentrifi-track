import React, {useState} from "react";

import tw from "twin.macro";
import styled from "styled-components";
import {useTransactions} from "../../../hooks/useTransactions";
import {toast, ToastContainer} from "react-toastify";
import {useERC20} from "../../../hooks/erc20/useERC20";
import {signal} from "@preact/signals-react";


const Container = styled.div`
  ${tw`mb-2 pt-2 text-gray-600 flex flex-nowrap w-full`}
  input {
    ${tw`w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none`}
  }
`

const ERC20Wrapper = tw.div`w-full grid justify-items-center py-4 my-4`
const ERC20Container = styled.div`
  ${tw`w-full mx-4 lg:w-1/3 bg-purple-500 rounded-lg`}
  h4 {
    ${tw`text-white text-2xl font-thin text-center my-4 text-gray-400`}
  }
`
const InputRow = tw.div`flex flex-row mt-6 w-10/12`
const InputLabel = tw.div`flex-col mx-2 mt-4 text-right w-1/4 text-gray-300 font-thin`
const InputHolder = tw.div`w-3/4 mx-2`

const SubmitRow = tw.div`flex justify-items-center grid mb-6`

const AmountButton = tw.button`mx-1 text-xs bg-purple-400 text-center text-gray-200 font-semibold rounded-xl px-1`
const SendButton = tw.button`mx-4 bg-purple-600 text-center text-gray-200 font-semibold py-1 rounded w-3/4 mt-4 hover:bg-purple-400`

const addressField = signal("")
const amountField = signal(0)

export function SendERC20({token, userBalance, refresh}) {


    const transactions = useTransactions();
    const erc20 = useERC20();

    async function requestNetworkChange(event) {
        event.stopPropagation();
        await transactions.validateChainId(token.network.chainId)
    }

    function setHalf() {
        amountField.value = userBalance / 2;
    }

    function setFull() {
        amountField.value = userBalance;
    }

    async function sendIt() {
        if (addressField.value === null || addressField.value === undefined || addressField.value.length !== 42) {
            toast("Please use a valid address to send tokens to.", {type: "error"})
            return;
        }
        if (amountField.value === null || amountField.value === undefined || amountField.value.length === 0) {
            toast("Please use a valid amount of tokens to send.", {type: "error"})
            return;
        }

        if (amountField.value > userBalance) {
            toast("You do not have enough tokens to send.", {type: "error"})
            return;
        }

        try {
            toast("Signing transaction to send tokens.");
            const result = await erc20.transfer(token, addressField.value, amountField);
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
        addressField.value = e.target.value;
    }

    function onAmountChange(e) {
        amountField.value = e.target.value;
    }

    const isOnCorrectChain = transactions.isOnCorrectChain(token.network.chainId);

    return (
        <ERC20Wrapper>
            <ToastContainer closeOnClick={false} theme={'light'}/>
            <ERC20Container>
                <h4>Send ERC20 Tokens</h4>

                <InputRow>
                    <InputLabel>
                        to:
                    </InputLabel>
                    <InputHolder>
                        <Container>
                            <input onChange={onAddressChange} type="text" name="to" placeholder="0x0"/>
                        </Container>
                    </InputHolder>
                </InputRow>

                <InputRow>
                    <InputLabel>
                        amount:
                        <div>
                            <AmountButton onClick={setHalf}>half</AmountButton>
                            <AmountButton onClick={setFull}>max</AmountButton>
                        </div>
                    </InputLabel>
                    <InputHolder>
                        <Container>
                            <input value={amountField} onChange={onAmountChange} type="number" name="amount"
                                   placeholder="0.00"/>
                        </Container>
                    </InputHolder>
                </InputRow>
                <SubmitRow>
                    {
                        isOnCorrectChain && <SendButton onClick={sendIt}>send</SendButton>
                    }
                    {
                        !isOnCorrectChain && <SendButton onClick={requestNetworkChange}>change network</SendButton>
                    }
                </SubmitRow>
            </ERC20Container>
        </ERC20Wrapper>
    )
}