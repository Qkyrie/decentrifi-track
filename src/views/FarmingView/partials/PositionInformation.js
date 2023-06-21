import React from 'react';
import DollarLabel from "../../../components/Label/DollarLabel";
import FallbackImage from "../../../components/Image/FallbackImage";
import tw from "twin.macro"

const StatTitle = tw.span`text-gray-600`
const StatDescription = tw.span`text-gray-400`
const StatName = tw.span`text-primary-300 font-bold text-4xl`


const FarmingMarketBox = tw.div`w-full flex flex-nowrap shadow p-2 mb-4`

const FarmingMarketLeft = tw.div`w-9/12 flex flex-col`
const FarmingMarketRight = tw.div`text-primary-300 w-3/12 text-center items-center grid justify-items-center`
const Logo = tw.div`w-12 h-12`
const ThinGreen = tw.span`text-green-500`
const FarmStats = tw.div`flex grid gap-2 grid-cols-3 w-full mb-4 mt-4`

function FarmingMarketInfo({farmingElement}) {

    return (
        <FarmingMarketBox>
            <FarmingMarketLeft>
                <StatTitle>{farmingElement.name} on {farmingElement.network.name}</StatTitle>
                <StatName>{farmingElement.name}</StatName>
                <StatDescription>{farmingElement.name} has a market size of <ThinGreen>
                    <DollarLabel
                        amount={farmingElement.marketSize}/>
                </ThinGreen></StatDescription>
            </FarmingMarketLeft>
            <FarmingMarketRight>
                <Logo>
                    <FallbackImage src={farmingElement.protocol.logo}/>
                </Logo>
            </FarmingMarketRight>
        </FarmingMarketBox>
    );
}

function BalanceInformation({
                                farmingViewHooks,
                                farmingElement,
                            }) {

    function getPercentage() {
        if (farmingViewHooks.staking !== null) {
            let stakingAmount = farmingViewHooks.staking.amount;
            return (stakingAmount * 100 / (stakingAmount + farmingViewHooks.wantBalance));
        } else {
            return 0;
        }
    }

    function getWalletDollarBalance() {
        return farmingViewHooks.wantAmountInDollars
    }

    function getStakingDollarBalance() {
        if (farmingViewHooks.staking !== null) {
            return farmingViewHooks.staking.dollarValue;
        }
        return 0
    }

    const stakingPowerText = () => {
        if(farmingViewHooks.getWantBalance() > 0) {
            return `${farmingViewHooks.getWantBalance()} ${farmingElement.stakedToken.symbol} left`
        } else {

        }
    }



    return (
        <FarmStats>
            <FarmingMarketBox>
                <FarmingMarketLeft>
                    <StatTitle>Wallet Balance</StatTitle>
                    <StatName>{farmingViewHooks.getWantBalance()}</StatName>
                    <StatDescription>That's around <ThinGreen><DollarLabel
                        amount={getWalletDollarBalance()}/> </ThinGreen> in {farmingElement.stakedToken.symbol}
                    </StatDescription>
                </FarmingMarketLeft>
                <FarmingMarketRight>
                    <Logo>
                        <FallbackImage src={farmingElement.protocol.logo}/>
                    </Logo>
                </FarmingMarketRight>
            </FarmingMarketBox>

            <FarmingMarketBox>
                <FarmingMarketLeft>
                    <StatTitle>Farming Balance</StatTitle>
                    <StatName>{farmingViewHooks.getStakedBalance()}</StatName>
                    <StatDescription>That's around <ThinGreen><DollarLabel
                        amount={getStakingDollarBalance()}/> </ThinGreen> in {farmingElement.stakedToken.symbol}
                    </StatDescription>
                </FarmingMarketLeft>
                <FarmingMarketRight>
                    <Logo>
                        <FallbackImage src={farmingElement.protocol.logo}/>
                    </Logo>
                </FarmingMarketRight>
            </FarmingMarketBox>


            <FarmingMarketBox>
                <FarmingMarketLeft>
                    <StatTitle>Staking Power</StatTitle>
                    <StatName>{getPercentage()}%</StatName>
                    <StatDescription>
                        <ThinGreen>{stakingPowerText}</ThinGreen>
                    </StatDescription>
                </FarmingMarketLeft>
                <FarmingMarketRight>
                    <Logo>
                        <FallbackImage src={farmingElement.protocol.logo}/>
                    </Logo>
                </FarmingMarketRight>
            </FarmingMarketBox>
        </FarmStats>
    )
}

export default function PositionInformation({farmingElement, farmingViewHooks}) {
    const Center = tw.div`w-full grid justify-items-center mt-4`

    return (
        <Center>
            <FarmingMarketInfo farmingElement={farmingElement}/>
            <BalanceInformation
                farmingViewHooks={farmingViewHooks}
                farmingElement={farmingElement}/>
        </Center>
    );
};