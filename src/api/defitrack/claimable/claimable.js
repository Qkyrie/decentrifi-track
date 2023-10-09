import defihub from "@decentri.fi/defi-hub";
import axios from "axios";

export const fetchClaimables = async (address, protocol) => {
    try {
        return await defihub.claiming().getClaimables(protocol.slug, address)
    } catch (_) {
        console.log(`unable to fetch claimables for ${protocol.slug} for address ${address}`);
        return [];
    }
}

export const fetchAllClaimables = async (address) => {
    const result = await axios.get(`https://claimables.decentri.fi/${address}`)
    return result.data
}