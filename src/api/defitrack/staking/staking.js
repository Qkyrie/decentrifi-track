import axios from "axios";
import defihub from "@decentri.fi/defi-hub";

export const farmingPositions = async (address, protocol) => {
    try {
        const farmingPositions = await defihub.farming().positions(protocol.slug, address);
        return farmingPositions;
    } catch (ex) {
        console.log(`unable to fetch farming positions for ${protocol.slug} for address ${address}`);
        return [];
    }
}

export const fetchStakingById = async (address, protocol, network, id) => {
    const result = await axios.get(`https://api.decentri.fi/${protocol.slug}/staking/${address}/positions?stakingElementId=${id}&network=${network.name}`);
    return result.data;
}

export const fetchStakingMarketsForToken = async (network, protocol, tokenAddress) => {
    try {
        return await defihub.farming().marketsForToken(protocol.slug, tokenAddress, network)
    } catch (ex) {
        console.log(`unable to fetch farming markets for ${protocol.slug} for address ${tokenAddress}`);
        return [];
    }
}

export const fetchStakingMarketById = async (network, protocol, stakingId) => {
    const result = await axios.get(`https://api.decentri.fi/${protocol}/staking/markets/${stakingId}?network=${network}`);
    return result.data;
}