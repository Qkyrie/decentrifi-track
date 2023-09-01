import BigNumber from "bignumber.js";
import React from "react";
import FallbackImage from "../../../components/Image/FallbackImage";
import tw from "twin.macro";

const Container = tw.div`w-full flex flex-col lg:flex-row px-2 py-2`
const TypeColumn = tw.div`lg:w-1/6 w-full text-center`
const TypeLabel = tw.span`py-1 px-3 font-medium rounded bg-purple-200 mx-4 my-3 `

const AmountColumn = tw.div`lg:w-1/3 w-full text-xs items-center text-center font-mono`
const SymbolColumn = tw.div`w-full lg:w-1/5 text-center lg:text-right grid  justify-items-center lg:justify-items-end`
const Center = tw.div`flex items-center`

const AssetLogo = tw.div`w-5 h-5`
const AssetText = tw.span`text-green-500 font-thin`
const FromOrToColumn = tw.div`lg:w-1/3 w-full text-center lg:text-right font-mono text-xs font-thin`

export default function TransferDetail({event, owner, index}) {
    const sign = (() => {
        if (event.metadata.from.address.toLowerCase() === owner.toLowerCase()) {
            return '-';
        } else {
            return '+';
        }
    })();

    const TheContainer = (() => {
        if (index % 2 === 0) {
            return tw(Container)`bg-white`
        } else {
            return tw(Container)`bg-gray-100`
        }
    })();

    const fromOrTo = (() => {
        if (event.metadata.from.address.toLowerCase() === owner.toLowerCase()) {
            return {
                sliced: event.metadata.to.label || sliceAccount(event.metadata.to.address),
                address: event.metadata.to.address,
                label: 'to',
                action: 'sent'
            }
        } else if(event.metadata.to.address.toLowerCase() === owner.toLowerCase()) {
            return {
                sliced: event.metadata.from.label || sliceAccount(event.metadata.from.address),
                address: event.metadata.from.address,
                label: 'from',
                action: 'received'
            }
        } else {
            return null;
        }
    })();

    if(fromOrTo == null) {
        return null;
    }

    if (!new BigNumber(0).isLessThan(new BigNumber(event.metadata.amount))) {
        return null;
    }

    if(event.metadata.from.address.toLowerCase() !== owner.toLowerCase() &&
        event.metadata.to.address.toLowerCase() !== owner.toLowerCase()
    ) {
        return null;
    }

    return (
        <TheContainer>
            <TypeColumn>
                <TypeLabel>{fromOrTo.action}</TypeLabel>
            </TypeColumn>
            <AmountColumn>{normalized(sign, event.metadata.amount, event.metadata.asset.decimals)}</AmountColumn>
            <SymbolColumn>
                <Center>
                    <AssetText>{event.metadata.asset.symbol}</AssetText>
                    &nbsp;
                    <AssetLogo><FallbackImage src={event.metadata.asset.logo} alt={event.metadata.asset.symbol}/></AssetLogo>
                </Center>
            </SymbolColumn>
            <FromOrToColumn>
                <a rel="noreferrer" target="_blank" href={`${event.network.baseUrl}/address/${fromOrTo.address}`}>{fromOrTo.label}: {fromOrTo.sliced}</a>
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
            return <span>&nbsp;&nbsp;&nbsp;0.00</span>;
        }
    }
};

const sliceAccount = function (address) {
    return `${address.slice(0, 6)}...${address.slice(-6, address.length)}`;
};