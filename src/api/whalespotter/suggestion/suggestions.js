import axios from "axios";

export async function getSuggestions(address) {
    const result = await axios.get(`https://whalespotter.decentri.fi/suggestions/${address}`)
    return result.data;
}