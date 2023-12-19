import axios from "axios";

export async function getEvents(address, page) {
    const actualPage = (page === null ? 0 : page - 1)
    const result = await axios.get(`https://whalespotter.decentri.fi/events/${address}?page=${actualPage}`);
    return await result.data;
}

export async function getHistoryJob(address) {
    const result = await axios.get(`https://whalespotter.decentri.fi/events/${address}/job`,)
    return result.data;
}