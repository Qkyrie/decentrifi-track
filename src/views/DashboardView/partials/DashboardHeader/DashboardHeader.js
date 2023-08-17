import React, {useContext, useMemo} from "react";

import FallbackImage from "../../../../components/Image/FallbackImage";
import makeBlockie from "ethereum-blockies-base64";

import tw from "twin.macro";
import DollarLabel from "../../../../components/Label/DollarLabel";
import {DashboardContext} from "../../../../App";
import styled from "styled-components";

const Address = styled.span`
  ${tw`hidden lg:block font-bold text-base text-black ml-2`}
  svg {
    ${tw`w-3 h-3 text-primary-500`}
  }
`
const ShortAddress = tw.span`lg:hidden block font-bold text-base text-black ml-2 border-b`
const ENS = tw.span`text-sm text-gray-500 ml-2`
const Blockie = tw.span`hidden lg:block rounded-xl relative p-2 w-24 `;
const GeneralInfo = tw.div`grid flex items-center mb-3 flex-col lg:flex-row w-full`

const LeftColumn = tw.div` w-full p-4 bg-white`

const AddressInfo = tw.div`flex items-center`
const AddressText = tw.div`flex flex-col`
const Wrapper = tw.div`flex grid justify-items-center flex-wrap lg:flex-nowrap p-4`;
const Center = tw.div`w-full lg:w-2/3 border rounded-xl`
const PortfolioValue = tw.div`lg:justify-items-end justify-self-center grid w-full`
const PortfolioValueContainer = tw.div`bg-gray-200 p-4 flex flex-col rounded-lg w-full lg:w-3/4 mx-4`

const ScanningContainer = tw.div`block m-auto`;
const ProgressText = tw.span`text-sm inline-block text-gray-500`

const PercentageContainer = tw.div`w-full h-2 bg-gray-200 rounded-full mt-2`;
const Percentage = tw.div`h-full text-center text-xs text-white bg-purple-500 rounded-full`

const PortfolioTitle = tw.span`text-sm text-primary-700 text-center lg:text-left justify-self-start`
const PortfolioAmount = tw.span`text-3xl text-center lg:text-left justify-self-start`

export default function DashboardHeader() {

    const {
        hasFinishedScanning,
        doneScanning,
        totalScanning,
        totalBalance,
        address,
        ens,
        refresh
    } = useContext(DashboardContext);

    const slicedAccount = useMemo(() => {
        console.log('slicing')
        if (address && address.length > 6) {
            return `${address.slice(0, 6)}...${address.slice(-6, address.length)}`;
        } else {
            return null
        }
    }, [address]);

    const percentageDone = calculate(doneScanning, totalScanning)
    const percentageDoneText = percentageDone + "%";

    function calculate() {
        if (doneScanning === 0 || totalScanning === 0) {
            return 0
        } else {
            return (100 * doneScanning / (totalScanning)).toFixed(2)
        }
    }

    const blockie = useMemo(() => {
        if (address !== null
        ) {
            return makeBlockie(address);
        } else {
            return null;
        }
    }, [address]);

    return (
        <Wrapper>
            <Center>
                <LeftColumn>
                    <GeneralInfo>
                        {
                            address &&
                            <AddressInfo>
                                <Blockie><FallbackImage src={blockie}/></Blockie>
                                <AddressText>
                                    <Address>{address} {
                                        hasFinishedScanning &&
                                        <svg onClick={() => refresh()} fill="#000" height="8px" width="8px"
                                             version="1.1"
                                             id="Capa_1" viewBox="0 0 489.645 489.645">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                               strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g>
                                                    <path
                                                        d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3 c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5 c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8 c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2 C414.856,432.511,548.256,314.811,460.656,132.911z"></path>
                                                </g>
                                            </g>
                                        </svg>
                                    }</Address>
                                    <ShortAddress>{slicedAccount}</ShortAddress>
                                    <ENS>{ens || "No ENS name linked."}</ENS>
                                </AddressText>
                            </AddressInfo>
                        }

                        <PortfolioValue onClick={() => {
                            if (hasFinishedScanning) {
                                refresh()
                            }
                        }}>
                            <PortfolioValueContainer>
                                <PortfolioTitle>Portfolio Value</PortfolioTitle>
                                <PortfolioAmount><DollarLabel pretty={true} amount={totalBalance}/></PortfolioAmount>
                            </PortfolioValueContainer>
                        </PortfolioValue>
                    </GeneralInfo>

                    {
                        !hasFinishedScanning &&
                        <ScanningContainer>
                            <ProgressText>
                                {percentageDoneText}
                            </ProgressText>
                            <PercentageContainer>
                                <Percentage style={{
                                    width: percentageDoneText
                                }}></Percentage>
                            </PercentageContainer>
                        </ScanningContainer>
                    }
                </LeftColumn>
            </Center>
        </Wrapper>
    )
};