import axios from "axios";

export async function getWhales() {
    const result = await axios.get("https://whalespotter.decentri.fi/whales");
    return result.data;
}