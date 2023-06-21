import defihub from "@decentri.fi/defi-hub";

export const fetchClaimables = async (address, protocol) => {
    try {
        return await defihub.claiming().getClaimables(protocol.slug, address)
    } catch(_) {
        console.log(`unable to fetch claimables for ${protocol.slug} for address ${address}`);
        return [];
    }
}