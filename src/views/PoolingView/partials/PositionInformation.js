import React from 'react';
import DollarLabel from "../../../components/Label/DollarLabel";
import FallbackImage from "../../../components/Image/FallbackImage";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import tw from "twin.macro";

const DefaultStat = tw.div`flex flex-nowrap shadow p-2`
const DoubleStat = tw(DefaultStat)`col-span-4`
const SingleStat = tw(DefaultStat)`col-span-1`
const StatLeft = tw.div`w-9/12 flex flex-col`
const StatRight = tw.div`text-primary-300 w-3/12 text-center items-center grid justify-items-center`
const StatTitle = tw.span`text-gray-600`
const StatCenterText = tw.div`text-primary-300 font-bold text-2xl`
const StatDescription = tw.span`text-gray-400`
const StatLogo = tw.div`w-12 h-12`

function PoolingMarketInfo({poolingMarketElement}) {

    return (
            <DoubleStat>
                <StatLeft>
                    <StatTitle>{poolingMarketElement.name} on {poolingMarketElement.network.name}</StatTitle>
                    <StatCenterText>{poolingMarketElement.name}</StatCenterText>
                    <StatDescription>{poolingMarketElement.name} has a market size of
                        <span tw="text-green-500"> <DollarLabel
                            amount={poolingMarketElement.marketSize}/></span>
                    </StatDescription>
                </StatLeft>
                <StatRight>
                    <StatLogo>
                        <FallbackImage src={poolingMarketElement.protocol.logo}/>
                    </StatLogo>
                </StatRight>
            </DoubleStat>
    )
}

function UnderlyingToken({token, network}) {
    return (
        <SingleStat>
            <StatLeft>
                <StatTitle>{token.symbol} on {network.name}</StatTitle>
                <StatCenterText>{token.name}</StatCenterText>
                <StatDescription></StatDescription>
            </StatLeft>
            <StatRight>
                <StatLogo>
                    <FallbackImage src={token.logo}/>
                </StatLogo>
            </StatRight>
        </SingleStat>
    )
}

function UnderlyingTokensInfo({poolingMarketElement}) {
    return poolingMarketElement.tokens.map(token => {
        return (
            <UnderlyingToken key={token.name} network={poolingMarketElement.network} token={token}/>
        )
    })
}


function BalanceInformation({poolingViewHooks}) {

    const underlyingTokenBalances = poolingViewHooks.underlyingTokenBalances;

    const underlyingTokenBalanceSection = underlyingTokenBalances.map((balance, i) => {

        function onSelectTokenClick() {
            poolingViewHooks.setSelectedUnderlyingTokenBalance(balance);
        }

        return (
            <tr key={i}>
                <td tw="p-2">
                    <div tw="flex items-center">
                        <div tw="w-12 flex-shrink-0 mr-2 sm:mr-3">
                            <FallbackImage src={balance.logo}/>
                        </div>

                        <div tw="text-gray-800">{balance.name}</div>
                    </div>
                </td>
                <td tw="p-2">
                    <div tw="text-center"><span
                        tw="text-green-600 text-base">{balance.viewableBalance}</span> {balance.symbol}</div>
                </td>
                <td tw="p-2">
                    <div tw="grid justify-items-center">
                        <PrimaryButton label="+" onClick={onSelectTokenClick}/>
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <div tw="mb-10 bg-white shadow-lg rounded-sm border border-gray-200 w-full">
            <header tw="px-5 py-4 border-b border-gray-100"><h2
                tw="font-semibold text-gray-800">Related Balance Information</h2></header>
            <div tw="p-3">
                <div tw="overflow-x-auto">
                    <table tw="table-auto w-full">
                        <thead tw="text-xs uppercase text-gray-400 bg-gray-600 rounded-sm">
                        <tr>
                            <th tw="p-2">
                                <div tw="font-semibold text-left">Protocol</div>
                            </th>
                            <th tw="p-2">
                                <div tw="font-semibold text-center">Balance</div>
                            </th>
                            <th tw="p-2">
                                <div tw="font-semibold text-center">Action</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody tw="text-sm font-medium divide-y divide-gray-100">
                        {underlyingTokenBalanceSection}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default function PositionInformation({poolingMarketElement, poolingViewHooks}) {

    const PositionInfo = tw.div`w-full grid gap-2 justify-items-center mt-4`
    const StatsContainer = tw.div`w-full grid grid-cols-4 mt-4 gap-2 mb-4`

    return <PositionInfo>
        <StatsContainer>
            <PoolingMarketInfo poolingMarketElement={poolingMarketElement}></PoolingMarketInfo>
            <UnderlyingTokensInfo poolingMarketElement={poolingMarketElement}/>
        </StatsContainer>
    </PositionInfo>;
};