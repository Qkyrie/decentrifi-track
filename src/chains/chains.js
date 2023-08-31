const chains = [
    {
        chainId: "0x1",
        name: "Ethereum Mainnet",
        shortName: "eth",
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'eth',
            decimals: 18,
        },
        blockExplorerUrls: ["https://etherscan.io"],
        rpcUrls: ["https://mainnet.infura.io/v3/"]
    },
    {
        chainId: "0xa4b1",
        chainName: "Arbitrum One",
        blockExplorerUrls: ["https://arbiscan.io"],
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'eth',
            decimals: 18,
        },
        rpcUrls: ["https://arb1.arbitrum.io/rpc"]
    },
    {
        chainId: "0xa",
        chainName: "OP Mainnet",
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'eth',
            decimals: 18,
        },
        rpcUrls: ["https://mainnet.optimism.io"],
        blockExplorerUrls: ["https://optimistic.etherscan.io/"]
    },
    {
        chainId: "89",
        chainName: "Polygon Mainnet",
        nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: ["https://polygon.llamarpc.com"],
        blockExplorerUrls: ["https://polygonscan.com/"]
    }
]

export function getByChainId(chainId) {
    return chains.find(chain => chain.chainId === chainId.toString(16))
}