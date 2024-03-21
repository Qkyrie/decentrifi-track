import React, {useContext} from 'react';
import DollarLabel from "../../../../components/Label/DollarLabel";
import tw from "twin.macro";
import AssetTable from "../../../../components/AssetTable/AssetTable";
import {DashboardContext} from "../../../../App";

const Header = tw.div`w-full flex items-center mb-2`
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow  py-1 px-4 text-sm font-medium mb-2 bg-orange-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Hidden = tw.span`hidden lg:block`

export default function PoolingDetails({protocol}) {

    const {
        lps,
        totalPoolingForProtocol
    } = useContext(DashboardContext)

    const elements = lps.filter(pooling => {
        return pooling.protocol.slug === protocol.slug
    }).map(element => {

        const amount = element.erc20Compatible ? element.amount : null;

        return {
            onClick: () => {
            },
            name: element.name,
            amount: amount,
            apr: element.apr,
            logo: element.protocol.logo,
            networkLogo: element.network.logo,
            dollarValue: element.dollarValue,
            symbol: ''
        }
    })


    if (elements.length === 0) {
        return (
            <>
            </>
        );
    } else {
        return (
           <>
               <AssetTable
                   entries={elements}
                   header={
                       <Header>
                           <HeaderTextContainer><HeaderText>Liquidity Pooling</HeaderText></HeaderTextContainer>
                           <BalanceText>
                               <Hidden>
                                   <PullRight>
                                       <HeaderText>
                                           <DollarLabel
                                               amount={totalPoolingForProtocol(protocol)}/>
                                       </HeaderText>
                                   </PullRight>
                               </Hidden>
                           </BalanceText>
                       </Header>
                   }
               />
           </>
        );
    }
}