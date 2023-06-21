import axios from "axios";

export async function getEvents(address) {
    const result = await axios.get(`https://whalespotter.decentri.fi/events/${address}`);
    if (result.status === 202) {
        return null
    } else {
        return result.data;
    }
}