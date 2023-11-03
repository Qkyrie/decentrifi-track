import BigNumber from "bignumber.js";
import React from "react";
import tw from "twin.macro";
import FallbackImage from "../../../components/Image/FallbackImage";

const Container = tw.div`w-full flex flex-col lg:flex-row px-2 py-2`
const TypeColumn = tw.div`lg:w-1/6 w-full text-center`
const TypeLabel = tw.span`py-1 px-3 font-medium rounded bg-blue-200 mx-4 my-3 `

const AmountColumn = tw.div`lg:w-1/3 w-full text-xs items-center text-center font-mono`
const SymbolColumn = tw.div`w-full lg:w-1/5 text-center lg:text-right grid  justify-items-center lg:justify-items-end`
const Center = tw.div`flex items-center`

const AssetLogo = tw.div`w-5 h-5`
const AssetText = tw.span`text-green-500 font-thin`
const FromOrToColumn = tw.div`lg:w-1/3 w-1/2  lg:text-right font-mono text-xs font-thin`

export default function SwapDetail({event, owner, index}) {
    const fromAmount = event.metadata.fromAmount;
    const fromToken = event.metadata.fromToken

    const toAmount = event.metadata.toAmount;
    const toToken = event.metadata.toToken

    const TheContainer = (() => {
        if (index % 2 === 0) {
            return tw(Container)`bg-white`
        } else {
            return tw(Container)`bg-gray-100`
        }
    })();

    return (
        <TheContainer>
            <TypeColumn>
                <TypeLabel>swap</TypeLabel>
            </TypeColumn>
            <AmountColumn>
                <div tw={"mb-1"}>{normalized("-", fromAmount, fromToken.toDecimals)}</div>
                <br/>
                <div>{normalized("+", toAmount, toToken.decimals)}</div>
            </AmountColumn>
            <SymbolColumn>
                <Center>
                    <AssetText> {fromToken.symbol}</AssetText>
                    &nbsp;
                    <AssetLogo><FallbackImage src={fromToken.logo} alt={fromToken.symbol}/></AssetLogo> <br/>

                </Center>
                <Center>
                    <AssetText> {fromToken.symbol}</AssetText>
                    &nbsp;
                    <AssetLogo><FallbackImage src={toToken.logo} alt={toToken.symbol}/></AssetLogo>
                </Center>
            </SymbolColumn>
            <FromOrToColumn>
            </FromOrToColumn>
        </TheContainer>
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