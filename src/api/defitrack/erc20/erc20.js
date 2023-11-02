import defihub from "@decentri.fi/defi-hub";

export const fetchWrappedToken = async (network) => {
    return await defihub.erc20().wrapped(network);
}

export const fetchTokenInformation = async (address, network) => {
    return await defihub.erc20().info(network, address);
}

export const fetchTokenBalance = async (token, user, network) => {
    return await defihub.erc20().getTokenBalanceV2(network, token, user);
}
