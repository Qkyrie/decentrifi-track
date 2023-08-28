import {useState} from "react";
import {useParams} from "react-router-dom";
import useProtocols from "../../DashboardView/hooks/useProtocols";
import {useQuery} from "@tanstack/react-query";
import defihub from '@decentri.fi/defi-hub'

export default function useProtocolView() {

    const params = useParams();

    const protoArgument = params.protocol;

    const [activeTab, setActiveTab] = useState();

    const {protocols} = useProtocols();
    const protocol = protocols.find(element => element.slug === protoArgument)

    const poolingMarketsQuery = useQuery({
        queryKey: ['protocols', protocol, 'pooling-markets'],
        queryFn: async () => {
            return await defihub.pooling().markets(protocol.slug);
        },
        enabled: !!protocol
    });

    const lendingMarkets = useQuery({
        queryKey: ['protocols', protocol, 'lending-markets'],
        queryFn: async () => {
            return await defihub.lending().markets(protocol.slug);
        },
        enabled: !!protocol
    });

    const farmingMarkets = useQuery({
        queryKey: ['protocols', protocol, 'farming-markets'],
        queryFn: async () => {
            return await defihub.farming().markets(protocol.slug);
        },
        enabled: !!protocol
    });


    const farmingOpportunities = farmingMarkets.data || []
    const lendingOpportunities = lendingMarkets.data || []
    const poolingOpportunities = poolingMarketsQuery.data || []


    function getTabs() {
        let t = [];
        if (poolingOpportunities.length > 0) {
            t.push({
                id: 'Pooling',
                selected: 'Pooling' === activeTab,
                name: `Pooling (${poolingOpportunities.length})`,
                onClick: () => setActiveTab('Pooling')
            });
        }
        if (lendingOpportunities.length > 0) {
            t.push({
                id: `Lending`,
                selected: 'Lending' === activeTab,
                name: `Lending (${lendingOpportunities.length})`,
                onClick: () => {
                    console.log('lending')
                    setActiveTab('Lending')
                }
            });
        }
        if (farmingOpportunities.length > 0) {
            t.push({
                id: 'Farming',
                selected: 'Farming' === activeTab,
                name: `Farming (${farmingOpportunities.length})`,
                onClick: () => {
                    console.log('farming')
                    setActiveTab('Farming')
                }
            });
        }

        if (t.length > 0 && !t.find((x) => {
            return x.selected
        })) {
            t[0].selected = true;
        }

        return t;
    }


    return {
        protocol,
        poolingOpportunities,
        farmingOpportunities,
        lendingOpportunities,
        poolingMarketsQuery,
        tabs: getTabs(),
        setActiveTab,
        networks: Array.from(
            new Set(
                (lendingOpportunities.concat(farmingOpportunities).concat(poolingOpportunities)).map((opportunity) => {
                    return opportunity.network.name
                })
            )
        )
    }
}