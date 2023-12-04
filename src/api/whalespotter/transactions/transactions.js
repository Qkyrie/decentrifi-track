import axios from "axios";

export async function getEvents(address) {
    const result = await axios.get(`https://whalespotter.decentri.fi/events/${address}`);
    return await result.data;
}

export async function getHistoryJob(address) {
    const result = await axios.get(`https://whalespotter.decentri.fi/events/${address}/job`,)
    return result.data;
}