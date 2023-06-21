import axios from "axios";

export const fetchBorrowingsV2 = async (address, protocol) => {
    try {
        const result = await axios.get(`https://api.decentri.fi/${protocol.slug}/borrowing/${address}/positions`);
        return result.data;
    } catch (ex) {
        console.log(`unable to fetch borrowings for ${protocol.slug} for address ${address}`);
        return [];
    }
}