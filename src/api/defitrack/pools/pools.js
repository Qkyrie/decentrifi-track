import axios from "axios";
import defihub from "@decentri.fi/defi-hub";

export const poolingPositions = async (address, protocol) => {
    try {
        return await defihub.pooling().positions(protocol.slug, address)
    } catch (ex) {
        console.log(`unable to fetch pooling positions for ${protocol.slug} for address ${address}`);
        return [];
    }
}

export const fetchPoolingMarketsForToken = async (network, protocol, address) => {
    try {
        return await defihub.pooling().marketsForToken(protocol.slug, address, network)
    } catch (ex) {
        console.log(`unable to fetch pooling markets for ${protocol.slug} for address ${address}`);
        return [];
    }
}

export const fetchPoolingMarketAlternativesForToken = async (network, protocol, address) => {
    try {
        const result = await axios.get(`https://api.decentri.fi/${protocol.slug}/pooling/markets/alternatives?network=${network}&token=${address}`);
        return result.data;
    } catch (ex) {
        console.log(`unable to fetch pooling market alternatives for ${protocol.slug} for address ${address}`);
        return [];
    }

}

export const fetchPoolingMarketById = async (network, protocol, poolingMarketId) => {
    const result = await axios.get(`https://api.decentri.fi/${protocol}/pooling/markets/${poolingMarketId}?network=${network}`);
    return result.data;
}