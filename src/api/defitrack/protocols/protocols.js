import defihub from "@decentri.fi/defi-hub";

export const fetchProtocols = async () => {
    return await defihub.protocols().list()
}