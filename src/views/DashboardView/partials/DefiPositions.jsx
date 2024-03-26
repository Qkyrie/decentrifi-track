import StakingDetails from "./StakingDetails";
import PoolingDetails from "./PoolingDetails";
import LendingDetails from "./LendingDetails";
import BorrowingDetails from "./BorrowingDetails";
import React, {useContext, useMemo} from "react";
import tw from "twin.macro";
import {DashboardContext} from "../../../App";
import ClaimableDetails from "./ClaimableDetails";


const ProtocolSection = tw.section`w-full grid justify-items-start mb-6 rounded py-4 rounded-lg border p-4`
const ProtocolSectionHeader = tw.a`w-full flex text-sm flex-row mb-2`;
const ProtocolSectionHeaderLogo = tw.img`h-6 w-6 mr-2`;
const ProtocolDetails = tw.div`w-full bg-white`
const HeaderText = tw.h3`py-1 text-sm font-medium mb-2 rounded-r text-gray-600`

const ProtocolTitle = tw.div`flex`

export default function DefiPositions() {

    const {
        usedProtocols,
    } = useContext(DashboardContext)

    const elements = useMemo(() => {
        return <div>
            {
                [...usedProtocols].sort((a, b) => {
                    return b.totalDollarValue - a.totalDollarValue
                }).map((proto, index) => {
                    return      <>
                        <ProtocolSectionHeader href={proto.website} target="_blank">
                            <HeaderText>
                                <ProtocolTitle>
                                    <ProtocolSectionHeaderLogo alt="logo" src={proto.logo}/>
                                    {proto.name}
                                </ProtocolTitle>
                            </HeaderText>

                        </ProtocolSectionHeader>
                        <ProtocolSection key={index}>
                            <ProtocolDetails>
                                <StakingDetails protocol={proto}/>
                                <PoolingDetails protocol={proto}/>
                                <LendingDetails protocol={proto}/>
                                <BorrowingDetails protocol={proto}/>
                                <ClaimableDetails protocol={proto}/>
                            </ProtocolDetails>
                        </ProtocolSection>
                    </>
                })
            }
        </div>
    }, [usedProtocols]);

    return <>
        {elements}
    </>
};