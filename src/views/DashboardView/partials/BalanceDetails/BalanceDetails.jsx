import React, {useContext} from 'react';
import {NumericFormat as NumberFormat} from "react-number-format";
import DollarLabel from "../../../../components/Label/DollarLabel";
import FallbackImage from "../../../../components/Image/FallbackImage";
import {useHistory} from "react-router-dom";

import tw from "twin.macro"
import PlaceholderLoading from "react-placeholder-loading";
import {Subheading} from "../../../../components/misc/Headings";
import SadWhalePic from "../../../../images/sad_whale.png";
import {DashboardContext} from "../../../../App";

const ListContainer = tw.div`flex flex-col w-full mx-auto items-center justify-center bg-white`
const List = tw.ul`flex flex-col w-full `
const CenterImage = tw.div`w-full flex justify-center my-2`
const SadWhaleImage = tw.img`w-10 h-10`
const ListItem = tw.li`flex flex-row`
const Row = tw.div`select-none cursor-pointer flex flex-1 items-center px-3 py-2 border-b`
const IconColumn = tw.div`flex flex-col w-1/12 justify-center items-center mr-4 lg:block`;
const IconBlock = tw.div`block relative`
const FallbackImageContainer = tw.div`flex flex-nowrap`
const Image = tw.div`h-5 w-5 lg:h-8 lg:w-8`
const OverlayImage = tw.div`lg:h-4 lg:w-4 h-2 w-2 -mx-2 `


const TwoColumns = tw.div`grid grid-cols-2`

const NameColumn = tw.div`px-1 pl-1 lg:w-1/4 w-3/4 flex-1 font-medium text-green-600 text-xs`
const AmountColumn = tw.div`px-1 hidden lg:block text-sm text-left text-gray-600 lg:w-1/3 w-0`

const TotalColumn = tw.div`px-1 text-sm text-left text-gray-600 w-1/3 lg:w-1/5 justify-items-end grid`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Bold = tw.span`font-bold text-sm`

const Center = tw.div`w-full mb-4 border p-4 rounded-lg`
const Section = tw.div`w-full bg-white py-4 `
const AssetHeader = tw.div`w-full flex items-center mb-2 `
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-green-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`
const ThinGreen = tw.span`text-green-500 font-thin`
const Hidden = tw.span`hidden lg:block`


function BalanceRow({balance}) {

    const history = useHistory()

    return (
        <ListItem onClick={() => {
            history.push(`/tokens/${balance.network.name}/${balance.token.address}`)
        }}>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <FallbackImage src={balance.token.logo}/>
                            </Image>
                            <OverlayImage>
                                <FallbackImage src={balance.network.logo}/>
                            </OverlayImage>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    {balance.token.name}
                </NameColumn>
                <AmountColumn>
                    <NumberFormat
                        value={balance.amount} displayType={'text'} decimalScale={4} thousandSeparator={true}/>
                    <ThinGreen>
                        &nbsp;
                        {balance.token.symbol}
                    </ThinGreen>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <Bold>
                            <DollarLabel amount={balance.dollarValue}/>
                        </Bold>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    );
}

function BalanceList({balances}) {
    const balanceElements = () => {
        if (balances.length > 0) {
            return balances.map((balance, idx) => {
                return <BalanceRow key={idx} balance={balance}/>
            });
        } else {
            return <DummyElement/>
        }
    }
    return (
        <ListContainer>
            <List>{balanceElements()}</List>
        </ListContainer>
    )
}

function DummyElement() {
    return (
        <ListItem>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <PlaceholderLoading width={30} height={30} shape={"circle"}/>
                            </Image>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    <PlaceholderLoading width={"100%"} height={"30"} shape={"rect"}/>
                </NameColumn>
                <AmountColumn>
                    <TwoColumns>
                        <PlaceholderLoading width={"100%"} height={"30"} shape={"rect"}/>
                        <PlaceholderLoading width={"100%"} height={"30"} shape={"rect"}/>
                    </TwoColumns>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <Bold>
                            <PlaceholderLoading width={"100%"} height={"30"} shape={"rect"}/>
                        </Bold>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    )
}

const Container = tw.div`w-full mr-4 flex flex-wrap`
const Header = tw.h3`text-lg font-medium mb-2  `

const Hero = tw.div`justify-self-center bg-gray-100 w-full border p-4 mb-4 text-center`
const HeroDescription = tw.p`text-gray-400 text-lg`

export default function BalanceDetails() {

    const {
        hasFinishedScanning,
        balanceElements,
        totalWalletBalance,
    } = useContext(DashboardContext)

    if (hasFinishedScanning && balanceElements.length === 0) {
        return (
            <Container>
                <Hero>
                    <Header>We couldn't find any <Subheading>Active Assets</Subheading></Header>
                    <CenterImage>
                        <SadWhaleImage src={SadWhalePic}/>
                    </CenterImage>
                    <HeroDescription>Unfortunately, we couldn't locate assets for this specific account. It might be a
                        fresh account or simply not exist at all.</HeroDescription>
                </Hero>
            </Container>
        )
    }
    return (
        <Center>
            <Section>
                <AssetHeader>
                    <HeaderTextContainer>
                        <HeaderText>WALLET</HeaderText>
                    </HeaderTextContainer>
                    <BalanceText>
                        <Hidden>
                            <PullRight>
                                <HeaderText>
                                    <DollarLabel
                                        amount={totalWalletBalance}/></HeaderText>
                            </PullRight>
                        </Hidden>
                    </BalanceText>
                </AssetHeader>
                <BalanceList balances={balanceElements}/>
            </Section>
        </Center>
    );
};