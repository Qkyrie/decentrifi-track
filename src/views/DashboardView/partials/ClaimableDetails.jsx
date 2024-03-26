import React, {useContext} from "react";
import DollarLabel from "../../../components/Label/DollarLabel";
import tw from "twin.macro";
import AssetTable from "../../../components/AssetTable/AssetTable";
import {DashboardContext} from "../../../App";

const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-blue-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Hidden = tw.span`hidden lg:block`

const AssetHeader = tw.div`w-full flex items-center mb-5 `

export default function ClaimableDetails({protocol}) {

    const {
        claimables,
        totalClaimables
    } = useContext(DashboardContext);

    const assetEntries = claimables.filter(claimable => {
        return claimable.protocol.slug === protocol.slug
    }).map(element => {
        return {
            symbol: element.token.symbol,
            detailUrl: `#`,
            name: element.name,
            breakdown: [
                {
                    amount: element.amount,
                    name: element.token.symbol,
                }
            ],
            apr: element.apr,
            logo: element.protocol.logo,
            networkLogo: element.network.logo,
            dollarValue: element.dollarValue
        }
    })


    if (assetEntries.length === 0) {
        return (
            <></>
        )
    }
    return (
        <AssetTable
            showPlaceholder={true}
            entries={assetEntries}
            header={
                <AssetHeader>
                    <HeaderTextContainer>
                        <HeaderText>CLAIMABLES</HeaderText>
                    </HeaderTextContainer>
                    <BalanceText>
                        <Hidden>
                            <PullRight>
                                <HeaderText>
                                    <DollarLabel
                                        amount={totalClaimables}/></HeaderText>
                            </PullRight>
                        </Hidden>
                    </BalanceText>
                </AssetHeader>
            }
        />
    )
};