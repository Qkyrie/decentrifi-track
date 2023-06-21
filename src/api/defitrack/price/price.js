import defihub from '@decentri.fi/defi-hub'

export const calculatePrice = async (priceRequest) => {
    return await defihub.prices().calculate(priceRequest.address, priceRequest.network, priceRequest.amount);
};