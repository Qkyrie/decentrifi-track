import axios from "axios";

export async function getEvents(address) {
    console.log('fetching events');
    const result = await axios.get(`https://whalespotter.decentri.fi/events/${address}`);
    console.log('result', result);
    return await result.data;
}