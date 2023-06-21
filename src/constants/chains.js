const chains = [
    {
        id: 1,
        name: 'Ethereum'
    },
    {
        id: 137,
        name: 'Polygon'
    },
    {
        id: 56,
        name: 'Binance Smart Chain'
    },
    {
        id: 250,
        name: 'Fantom'
    },
    {
        id: 42161,
        name: 'Arbitrum One'
    },
    {
        id: 43114,
        name: 'Avalanche'
    },
]

export default function getChain(chainId) {
    console.log(chainId)
    return chains.find(c => c.id === chainId) | {
        id: chainId,
        name: "Unknown chain"
    }
}