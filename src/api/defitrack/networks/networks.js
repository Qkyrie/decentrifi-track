import defihub from '@decentri.fi/defi-hub'

export const fetchNetworks = async () => {
    return await defihub.networks().list();
}