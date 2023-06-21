import axios from "axios";

export async function getApprovals(address, authentication) {
    const result = await axios.get(`https://whalespotter.decentri.fi/allowance/${address}`,)
    return result.data;
}