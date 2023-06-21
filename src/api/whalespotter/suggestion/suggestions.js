import axios from "axios";

export async function getSuggestions(address, authentication) {
    const result = await axios.get(`https://whalespotter.decentri.fi/suggestions/${address}`, {
        headers: {
            ...authentication
        }
    })
    return result.data;
}