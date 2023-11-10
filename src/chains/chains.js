const chains = [
    {
        chainId: "1",
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
        chainId: "a4b1",
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
        chainId: "a",
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
    },
    {
        chainId: "2105",
        chainName: "Base",
        nativeCurrency: {
            name: 'Eth',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ["https://base.publicnode.com"],
        blockExplorerUrls: ["https://basescan.org/"]
    }
]

export function getByChainId(chainId) {
    return chains.find(chain => chain.chainId ===  chainId.toString(16))
}