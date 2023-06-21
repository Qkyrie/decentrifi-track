import axios from "axios";

export async function getAccount(authentication) {
    const result = await axios.get("https://whalespotter.decentri.fi/account", {
        headers: {
            ...authentication
        }
    })
    return result.data;
}