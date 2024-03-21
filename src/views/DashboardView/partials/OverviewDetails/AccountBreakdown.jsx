import React, {useContext} from "react";
import DollarLabel from "../../../../components/Label/DollarLabel";
import {CurrencyDollarIcon} from "@heroicons/react/outline";
import DetailCard from "../../../../components/Card/DetailCard"; //eslint-disable-line
import tw from 'twin.macro';
import PlaceholderLoading from "react-placeholder-loading";
import {Subheading} from "../../../../components/misc/Headings";
import SadWhalePic from "../../../../images/sad_whale.png";
import {useHistory} from "react-router-dom";
import {DashboardContext} from "../../../../App";


const Container = tw.div`w-full mr-4 flex flex-wrap  p-4 rounded-lg mb-2`
const Table = tw.div`w-full flex flex-wrap mb-2`

const GreenDollarIcon = tw(CurrencyDollarIcon)`text-green-400 h-8 w-8`
const YellowDollarIcon = tw(CurrencyDollarIcon)`text-yellow-400 h-8 w-8`
const BlueDollarIcon = tw(CurrencyDollarIcon)`text-blue-400 h-8 w-8`
const OrangeDollarIcon = tw(CurrencyDollarIcon)`text-orange-400 h-8 w-8`
const RedDollarIcon = tw(CurrencyDollarIcon)`text-red-400 h-8 w-8`

const ProgressBar = tw.div`text-xs leading-none h-1 text-center text-white rounded`
const BlueProgressBar = tw(ProgressBar)`bg-blue-500`
const YellowProgressBar = tw(ProgressBar)`bg-yellow-500`
const GreenProgressBar = tw(ProgressBar)`bg-green-500`
const OrangeProgressBar = tw(ProgressBar)`bg-orange-500`

const HeaderText = tw.h3`mx-2 shadow px-4 py-1 text-sm font-medium mb-2 bg-green-600 rounded-r  text-white`

const Logo = tw.img`h-8 w-8`
const FullRow = tw.div`w-1/4`

function Protocols() {

    const {
        usedProtocols
    } = useContext(DashboardContext)

    const getElements = () => {
        if (usedProtocols.length > 0) {
            return usedProtocols.map(protocol => {
                return <ProtocolElement protocol={protocol} key={protocol.name}/>
            })
        } else {
            return <DummyCard/>
        }
    }

    return (
        <>
            {getElements()}
        </>
    )
}

function ProtocolElement({protocol}) {
    const history = useHistory();

    return (
        <FullRow onClick={
            () => {
                history.push(`/protocols/${protocol.slug}`)
            }
        }>
            <DetailCard title={protocol.name}
                        centerHtml={<DollarLabel amount={protocol.totalDollarValue}/>}
                        icon={
                            <Logo alt="logo" src={protocol.logo}/>
                        }/>
        </FullRow>
    )
}

function DummyCard() {
    return (
        <FullRow>
            <DetailCard title={<PlaceholderLoading width={'100%'} height={20} shape={"rect"}/>}
                        icon={<PlaceholderLoading width={30} height={30} shape={"circle"}/>}
            />
        </FullRow>
    )
}

export default function AccountBreakdown() {

    return (
        <>
            <Container>
                <AccountOverview/>
                <DefiOverview/>
            </Container>
        </>
    );
}

function AccountOverview() {

    const {
        hasFinishedScanning,
        totalWalletBalance,
        totalLending,
        totalStaking,
        totalPooling,
        totalBorrowing,
        totalClaimables,
    } = useContext(DashboardContext)


    function totalDollarValue() {
        return ((totalWalletBalance)
            + (totalLending)
            + (totalStaking) + (totalPooling) + totalClaimables
        )
    }

    function calculateAssetAllocation() {
        const total = totalDollarValue();
        if (total === 0) {
            return {
                lending: 0,
                staking: 0,
                balance: 0,
                pooling: 0
            }
        }

        return {
            lending: (totalLending / total) * 100,
            staking: (totalStaking / total) * 100,
            pooling: (totalPooling / total) * 100,
            balance: ((totalWalletBalance) / total) * 100
        };
    }

    if (hasFinishedScanning && totalDollarValue() === 0) {
        return <></>
    }

    const assetAllocation = calculateAssetAllocation();
    return (
        <>
            <HeaderText>Account Breakdown</HeaderText>
            <Table>
                {totalWalletBalance > 0 &&
                    <FullRow>
                        <DetailCard title="Wallet"
                                    centerHtml={<DollarLabel amount={totalWalletBalance}/>}
                                    bottomHtml={
                                        <GreenProgressBar
                                            style={{
                                                width: assetAllocation.balance + '%'
                                            }}>
                                        </GreenProgressBar>
                                    }
                                    icon={<GreenDollarIcon/>}
                        />
                    </FullRow>
                }
                {
                    totalDollarValue() === 0 &&
                    <DummyCard/>
                }
                {totalLending > 0 &&
                    <FullRow>
                        <DetailCard title="Lending"
                                    centerHtml={<DollarLabel amount={totalLending}/>}
                                    bottomHtml={
                                        <YellowProgressBar
                                            style={{
                                                width: assetAllocation.lending + '%'
                                            }}>
                                        </YellowProgressBar>
                                    }
                                    icon={<YellowDollarIcon/>}
                        />
                    </FullRow>
                }
                {totalBorrowing > 0 &&
                    <FullRow>
                        <DetailCard title="Borrowing"
                                    centerHtml={<DollarLabel amount={totalBorrowing}/>}
                                    icon={<RedDollarIcon/>}/>
                    </FullRow>
                }
                {totalPooling > 0 &&
                    <FullRow>
                        <DetailCard title="Pooling"
                                    icon={<OrangeDollarIcon/>}
                                    centerHtml={<DollarLabel amount={totalPooling}/>}
                                    bottomHtml={<OrangeProgressBar
                                        style={{
                                            width: assetAllocation.pooling + '%'
                                        }}></OrangeProgressBar>}/>
                    </FullRow>
                }
                {totalStaking > 0 &&
                    <FullRow>
                        <DetailCard title="Farming"
                                    icon={<BlueDollarIcon/>}
                                    centerHtml={<DollarLabel amount={totalStaking}/>}
                                    bottomHtml={
                                        <BlueProgressBar
                                            style={{
                                                width: assetAllocation.staking + '%'
                                            }}>
                                        </BlueProgressBar>}
                        />
                    </FullRow>
                }

            </Table>
        </>
    )
}

function DefiOverview() {

    const {
        usedProtocols,
        hasFinishedScanning
    } = useContext(DashboardContext)

    if (usedProtocols.length === 0 && hasFinishedScanning) {
        return <>
        </>
    }

    return (
        <>
            <HeaderText>Protocol Holdings</HeaderText>
            <Table>
                <Protocols/>
            </Table>
        </>
    );
}
