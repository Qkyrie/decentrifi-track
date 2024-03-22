import {farmingPositions} from "../../../api/defitrack/staking/staking";
import useProtocols from "./useProtocols";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";

export default function useDashboardStakingHooks(account, supportsStaking, {
    addToTotalScanning,
    incrementProgress,
}) {

    const protocols = useProtocols().protocols

    const [positions, setPositions] = useState([]);

    function loadData() {
        let farmingProtocols = protocols.filter(proto => {
            return proto.primitives.includes('FARMING');
        });

        addToTotalScanning(farmingProtocols.length);

        farmingProtocols.forEach(async (protocol) => {
            const positions = await farmingPositions(account, protocol)
            incrementProgress();
            setPositions((prev) => [...prev, ...positions]);
        });
    }

    useEffect(() => {
        loadData();
    }, [protocols]);

    function refresh() {
        setPositions((prev) => []);
        loadData();
    }

    return {
        stakings: positions || [],
        refresh
    }
};