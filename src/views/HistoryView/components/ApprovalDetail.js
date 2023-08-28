import BigNumber from "bignumber.js";
import React from "react";
import FallbackImage from "../../../components/Image/FallbackImage";
import tw from "twin.macro";

const Container = tw.div`w-full flex  px-2`
const TypeColumn = tw.div`lg:w-1/6 w-1/2`
const TypeLabel = tw.span`px-2 font-medium  rounded mx-4 my-1`
const RevokeTypeLabel = tw(TypeLabel)`bg-red-100`
const ApproveTypeLabel = tw(TypeLabel)`bg-green-100`

const AmountColumn = tw.div`lg:w-1/3 w-1/2 flex items-center text-center font-mono`
const SymbolColumn = tw.div`w-1/2 lg:w-1/5  text-right grid  justify-items-center lg:justify-items-end`
const Center = tw.div`flex items-center`

const AssetLogo = tw.div`w-5 h-5`
const AssetText = tw.span`text-green-500 font-thin`
const FromOrToColumn = tw.div`lg:w-1/3 w-1/2 lg:text-right font-mono`

export default function ApprovalDetail({event, owner}) {

    if (event.metadata.owner.address.toLowerCase() !== owner.toLowerCase()) {
        return null
    }

    const revokeOrApproval = (event) => {
        if (new BigNumber(event.metadata.amount).isZero()) {
            return <RevokeTypeLabel>revoke</RevokeTypeLabel>
        } else {
            return <ApproveTypeLabel>approval</ApproveTypeLabel>
        }
    }

    return (
        <Container>
            <TypeColumn>
                {revokeOrApproval(event)}
            </TypeColumn>
            <AmountColumn></AmountColumn>
            <SymbolColumn>
                <Center>
                    <AssetText>{event.metadata.asset.symbol}</AssetText>
                    &nbsp;
                    <AssetLogo><FallbackImage src={event.metadata.asset.logo} alt={event.metadata.asset.symbol}/>
                    </AssetLogo>
                </Center>
            </SymbolColumn>
            <FromOrToColumn>spender:
                <a rel="noreferrer" target="_blank" href={`${event.network.baseUrl}/address/${event.metadata.spender.address}`}>
                     {event.metadata.spender.label || sliceAccount(event.metadata.spender.address)}
                </a>
            </FromOrToColumn>
        </Container>
    );
}

const sliceAccount = function (address) {
    return `${address.slice(0, 6)}...${address.slice(-6, address.length)}`;
};