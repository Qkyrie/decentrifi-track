import axios from "axios";

export async function getApprovals(address, authentication) {
    const result = await axios.get(`https://whalespotter.decentri.fi/allowance/${address}`,)
    return result.data;
}

export async function getApprovalJob(address) {
    const result = await axios.get(`https://whalespotter.decentri.fi/allowance/${address}/job`,)
    return result.data;
}