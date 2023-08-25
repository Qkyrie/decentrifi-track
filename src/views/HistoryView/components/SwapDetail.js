import BigNumber from "bignumber.js";
import React from "react";
import FallbackImage from "../../../components/Image/FallbackImage";
import tw from "twin.macro";

const Container = tw.div`w-full flex px-2`
const TypeColumn = tw.div`lg:w-1/6 w-1/2 `
const TypeLabel = tw.span`px-2 font-medium  rounded bg-blue-100 mx-4 my-1`

const AmountColumn = tw.div`lg:w-1/3 w-1/2 flex flex-col items-start text-center font-mono`
const SymbolColumn = tw.div`w-1/2 lg:w-1/5 text-right grid  justify-items-center lg:justify-items-end`
const Center = tw.div`flex flex-col`

const AssetLogo = tw.div`w-5 h-5`
const AssetText = tw.span`text-green-500 font-thin`
const FromOrToColumn = tw.div`lg:w-1/3 w-1/2  lg:text-right font-mono`

export default function SwapDetail({event, owner}) {
    console.log(event);
    const fromAmount = event.metadata.fromAmount;
    const fromToken = event.metadata.fromToken

    const toAmount = event.metadata.toAmount;
    const toToken = event.metadata.toToken

    return (
        <Container>
            <TypeColumn>
                <TypeLabel>swap</TypeLabel>
            </TypeColumn>
            <AmountColumn>
                <div tw={"mb-1"}>{normalized("-", fromAmount, fromToken.toDecimals)}</div>
                <br />
                <div>{normalized("+", toAmount, toToken.decimals)}</div>
            </AmountColumn>
            <SymbolColumn>
                <Center>
                   <AssetText> {fromToken.symbol}</AssetText>
                    <br />
                    <AssetText>{toToken.symbol}</AssetText>
                </Center>
            </SymbolColumn>
            <FromOrToColumn>
            </FromOrToColumn>
        </Container>
    );
}

const normalized = function (sign, amount, decimals = 18) {
    if (amount == null) {
        return "0.00"
    } else {
        const result = new BigNumber(amount).dividedBy(
            new BigNumber(10).exponentiatedBy(decimals)
        )
        if (new BigNumber(0).isLessThan(result)) {
            return `~ ${sign}${result.toFixed(6, 0)}`;
        } else {
            return <>&nbsp;&nbsp;&nbsp;0.00</>;
        }
    }
};