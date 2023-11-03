import React from "react";
import FallbackImage from "../../../components/Image/FallbackImage";
import tw from "twin.macro";

const Container = tw.div`w-full flex flex-col lg:flex-row px-2 py-2`
const TypeColumn = tw.div`lg:w-1/6 w-full text-center`
const TypeLabel = tw.span`px-3 py-1 font-medium  rounded bg-blue-200 mx-4 my-3`

const AmountColumn = tw.div`lg:w-1/3 w-full text-xs flex flex-col items-center text-center font-mono`
const SymbolColumn = tw.div`w-1/2 lg:w-1/5 text-right grid  justify-items-center lg:justify-items-end`
const Center = tw.div`flex items-center`

const AssetLogo = tw.div`w-5 h-5`
const AssetText = tw.span`text-green-500 font-thin`
const FromOrToColumn = tw.div`lg:w-1/3 w-1/2  lg:text-right font-mono text-xs`

export default function AddLiquidityDetail({event, owner, index}) {
    const amounts = event.metadata.deposits.map(deposit =>  {
        return <div>
            ~ +{deposit.amount}
        </div>
    });

    const TheContainer = (() => {
        if (index % 2 === 0) {
            return tw(Container)`bg-white`
        } else {
            return tw(Container)`bg-gray-100`
        }
    })();

    const symbols = event.metadata.deposits.map(deposit =>  {
        return <>
            <AssetText>
                {deposit.token.symbol}
            </AssetText>
            &nbsp;
            <AssetLogo><FallbackImage src={deposit.token?.logo} alt={deposit.token.symbol}/></AssetLogo>
        </>
    });

    return (
        <TheContainer>
            <TypeColumn>
                <TypeLabel>add liquidity</TypeLabel>
            </TypeColumn>
            <AmountColumn>
                {amounts}
            </AmountColumn>
            <SymbolColumn>
                <Center>
                    {symbols}
                </Center>
            </SymbolColumn>
            <FromOrToColumn>
            </FromOrToColumn>
        </TheContainer>
    );
}