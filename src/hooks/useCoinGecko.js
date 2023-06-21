import axios from "axios";

export async function fetchHistoricalData(address, network) {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${network}/contract/${address}/market_chart/?vs_currency=usd&days=30`);
    return result.data;
}

export default function useCoinGecko() {




    /*
    exmaple:
    {
  "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd": {
    "usd": 10.51,
    "usd_24h_vol": 194894.8133134913,
    "usd_24h_change": -1.6230069219629253,
    "last_updated_at": 1676636672
  }
}
     */
    async function getGeneralStats(address, network) {
        const result = await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${address}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
        return result.data;
    }


}