import FallbackImage from "../../../components/Image/FallbackImage";
import DollarLabel from "../../../components/Label/DollarLabel";
import tw from "twin.macro";
import React from "react";
import TokenChart from "./TokenChart";

const DefaultStat = tw.div`flex flex-nowrap shadow p-2`
const DoubleStat = tw(DefaultStat)`col-span-2`
const SingleStat = tw(DefaultStat)`col-span-1`
const StatLeft = tw.div`w-full flex flex-col`
const TokenInfo = tw.div`w-full flex flex-col`
const StatTitle = tw.span`text-gray-600`
const StatCenterText = tw.div`text-primary-300 font-bold text-4xl`
const StatDescription = tw.span`text-gray-400`
const StatLogo = tw.div`w-12 h-12`
const Center = tw.div`w-full grid justify-items-center`
const TokenLogo = tw.div`text-primary-300 w-3/12 text-center items-center grid justify-items-center`
const StatsContainer = tw.div`lg:w-2/3 w-full lg:grid lg:grid-cols-4 mt-4 gap-2`


const Green = tw.span`text-green-500`
const Bold = tw.b`text-black`


export default function TokenStats({token, userBalance, network}) {

    const userDollarBalance = userBalance * token.dollarValue


    return (
        <Center>
            <StatsContainer>
                <DoubleStat>
                    <TokenInfo>
                        <StatTitle>{token.symbol} on {network.toLowerCase()}</StatTitle>
                        <StatCenterText>{token.name}</StatCenterText>
                    </TokenInfo>
                    <TokenLogo>
                        <StatLogo>
                            <FallbackImage src={token.logo}/>
                        </StatLogo>
                    </TokenLogo>
                </DoubleStat>

                <SingleStat>
                    <StatLeft>
                        <StatTitle>Token Value</StatTitle>
                        <StatCenterText><DollarLabel amount={token.dollarValue}/></StatCenterText>
                        <StatDescription>(Approximate value for <Green>{token.symbol}</Green>).</StatDescription>
                    </StatLeft>

                </SingleStat>
                {userBalance !== null &&
                    <>
                        <SingleStat>
                            <StatLeft>
                                <StatTitle>Your Balance</StatTitle>
                                <StatCenterText>
                                    <DollarLabel amount={userDollarBalance}/>
                                </StatCenterText>
                                <StatDescription>Your wallet contains <Bold>{userBalance}</Bold>
                                    <Green> {token.symbol}</Green>.</StatDescription>
                            </StatLeft>
                        </SingleStat>
                    </>
                }


            </StatsContainer>
            <TokenChart token={token}/>

        </Center>
    )

}