import defihub from "@decentri.fi/defi-hub";

export const fetchAllClaimables = async (address) => {
    try {
        return await defihub.claimables().getClaimables(address)
    } catch (_) {
        console.log(`unable to fetch claimables for address ${address}`);
        return [];
    }
}