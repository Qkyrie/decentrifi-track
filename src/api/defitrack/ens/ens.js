import axios from "axios";

export async function getEns(name) {
    const result = await axios.get(`https://api.decentri.fi/ens/by-name/${name}`);
    return result.data;
};

export async function getReverseEns(address) {
    const result = await axios.get(`https://api.decentri.fi/ens/by-address/${address}`);
    return result.data;
};