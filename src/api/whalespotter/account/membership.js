import axios from "axios";

export async function getMembership(address) {
    const result = await axios.get(`https://whalespotter.decentri.fi/membership/${address}`)
    return result.data;
}