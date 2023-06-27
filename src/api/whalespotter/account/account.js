import axios from "axios";

export async function getAccount(address) {
    const result = await axios.get(`https://whalespotter.decentri.fi/users/${address}`)
    return result.data;
}