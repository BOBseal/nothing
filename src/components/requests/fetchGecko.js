// fetch gainers and losers from coin gecko
import {config} from 'dotenv'
import { coinGeckoBaseUrl } from "../constants/constants";
import { UnixTimestampConverter } from "@/constants";

const CoinGeckoApiKey = "ENTER API KEY COINGECKO"; // API KEY HERE FOR NOW


// List All Supported Coins Id , name and Symbol 
/* 
@returns json=> 
[
  {
    "id": "zyx",
    "symbol": "zyx",
    "name": "ZYX",
    "platforms": {
      "ethereum": "0xf974b5f9ac9c6632fee8b76c61b0242ce69c839d",
      "binance-smart-chain": "0x377c6e37633e390aef9afb4f5e0b16689351eed4",
      "arbitrum-one": "0x377c6e37633e390aef9afb4f5e0b16689351eed4"
    }
  },
  {
    "id": "zzz",
    "symbol": "zzz",
    "name": "GoSleep ZZZ",
    "platforms": {
      "arbitrum-one": "0x7a2c1b8e26c48a5b73816b7ec826fd4053f5f34b",
      "binance-smart-chain": "0x0b9bdcc696efa768cafe0e675525eaf42e32d108"
    }
  }
]
*/
export const fetchCoinList = async()=>{
  try {
    const x = await fetch(`${coinGeckoBaseUrl}/coins/list?include_platform=true&x_cg_pro_api_key=${CoinGeckoApiKey}`);
    const y = await x.json();
    return y;
  } catch (error) {
    console.log(error);
    return("Error Occured When Fetching All Coin List1");
  }
}

/* 
Get current data (name, price, market, ... including exchange tickers) for a coin.

IMPORTANT:
Ticker object is limited to 100 items, to get more tickers, use /coins/{id}/tickers
Ticker is_stale is true when ticker that has not been updated/unchanged from the exchange for more than 8 hours.
Ticker is_anomaly is true if ticker's price is outliered by our system.
You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide)

Note: to check if a price is stale, please refer to last_updated of the price.

Dictionary:

last: latest unconverted price in the respective pair target currency
volume: unconverted 24h trading volume in the respective pair target currency
converted_last: latest converted price in BTC, ETH, and USD
converted_volume: converted 24h trading volume in BTC, ETH, and USD


localisation = false

id = refer to coinlist data
*/

export const fetchCoinData = async({id})=>{
  try {
    const x = await fetch(`${coinGeckoBaseUrl}/coins/${id}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=falsee&x_cg_pro_api_key=${CoinGeckoApiKey}`);
    const y = await x.json();
    return y;
  } catch (error) {
    console.log(error);
    return ("Coin Data Fetch Failed");
  }
}

//history - unix timestamp
export const fetchCoinSnapshotAtDay = async({id, time})=>{
  const timeS = UnixTimestampConverter({unixTimestamp: time});
  try {
    const x = await fetch(`${coinGeckoBaseUrl}/coins/${id}/history?date=${timeS}&localization=false&x_cg_pro_api_key=${CoinGeckoApiKey}`);
    const y = await x.json();
    return y;
  } catch (error) {
    console.log(error);
    return ("Coin Data Fetch Failed");
  }
}

/* 
has pagination

Use this to obtain all the coins market data (price, market cap, volume), per page.

Note: when both 'category' and 'ids' parameters are supplied, the 'category' parameter takes precedence over the 'ids' parameter.

@param=> ids =>  The ids of the coin, comma separated crytocurrency symbols => refer to coinlist
category => coin category , refer to cointlist call result
order => the order to get the results in => market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc
perPage => per page result count || pagination
pageNo => page no acc to the per page result count
bool => true : false
timeRange=> time range to get the price percent change
precision => decimals
*/

export const fetchCoinMarketData=async({ids, pageNo, bool , timeRange})=>{
  try {
    const x = await fetch(`${coinGeckoBaseUrl}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=200&page=${pageNo}&sparkline=${bool}&price_change_percentage=${timeRange}&x_cg_pro_api_key=${CoinGeckoApiKey}`);
    const y = await x.json();
    return y;
  } catch (error) {
    console.log(error);
    return("Error Occured When Fetching Specific Coin Data");
  }
}

export const fetchCoinMarketData24hoursRange=async({id,timeFrom , timeTo})=>{
  try {
    const x = await fetch(`${coinGeckoBaseUrl}/coins/${id}/market_chart/range?vs_currency=usd&from=${timeFrom}&to=${timeTo}&x_cg_pro_api_key=${CoinGeckoApiKey}`);
    const y = await x.json();
    return y;
  } catch (error) {
    console.log(error);
    return("Error Occured When Fetching Specific Coin Data");
  }
}

export const fetchCoinMarketData24hoursRangeFromToday=async({id,daysAgo})=>{
  try {
    const x = await fetch(`${coinGeckoBaseUrl}/coins/${id}/market_chart?vs_currency=usd&days=${daysAgo}&interval=daily&x_cg_pro_api_key=${CoinGeckoApiKey}`);
    const y = await x.json();
    return y;
  } catch (error) {
    console.log(error);
    return("Error Occured When Fetching Specific Coin Data");
  }
}

/*
@param=> ids => id of coins, comma-separated if querying more than 1
for ids refer to coinlist

gets current price
*/
export const fetchCoinPrice=async({ids})=>{
try {
  const x = await fetch(`${coinGeckoBaseUrl}/simple/price?ids=${ids}&vs_currencies=usd&x_cg_pro_api_key=${CoinGeckoApiKey}`);
  const y = x.json();
  return y;
} catch (error) {
  console.log(error);
  return("Coin Price Fetch gone wrong")
}
}


// returns json object 
/*
@Params=> time => timeFrame of gainers&losers
top coins => no of rank upto wanted or set to max
eg return =>

"top_gainers": [
    {
      "id": "fuc",
      "symbol": "fuc",
      "name": "FUBT Token",
      "image": "https://assets.coingecko.com/coins/images/8132/original/FUC_fubt_token.png?1555325050",
      "market_cap_rank": 245,
      "usd": 1.4820952731507908,
      "usd_24h_vol": 213343.65423003546,
      "usd_24h_change": 34.08570907794165
    },
    ...
  ],
  "top_losers": [
    {  
      "id": "space-id",
      "symbol": "id",
      "name": "SPACE ID",
      "image": "https://assets.coingecko.com/coins/images/29468/original/sid_token_logo_%28green2%29.png?1679454702",
      "market_cap_rank": 216,
      "usd": 0.5398050441850678,
      "usd_24h_vol": 592030891.3057652,
      "usd_24h_change": -41.0126355910758
    },
    ...
  ]
*/
export const fetchGainersAndLosersUSD =async({timeRange , topCoins})=>{
    try {
        const x = await fetch(`${coinGeckoBaseUrl}/coins/top_gainers_losers?vs_currency=usd&duration=${timeRange}&top_coins=${topCoins}&x_cg_pro_api_key=${CoinGeckoApiKey}`);
        const aa =await x.json();
        return aa;
    } catch (error) {
        console.log(error);
        return ("Error Occured when Fetcing Daily Gainers & Losers Data");
    }
}

/*
Candle's body - data granularity is automatic (cannot be adjusted for public api users):
returns=> array: [array , array...]
1 - 2 days: 30 minutes
3 - 30 days: 4 hours
31 days and beyond: 4 days
Daily candle interval parameter is available for paid plan users only (Analyst/Lite/Pro/Enterprise), use interval=daily parameter in your request:

'daily' interval: available for 1/7/14/30/90/180 days
Cache / Update Frequency: every 30 minutes
The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).

@params=>
id refer to coinlist 
vs currency : usd , eur etc
days : data upto no of days ago
*/

export const fetchCoinOHLC = async({id ,VsCurrency ,days})=>{
  try {
    const x = await fetch(`${coinGeckoBaseUrl}/coins/${id}/ohlc?vs_currency=${VsCurrency}&days=${days}&x_cg_pro_api_key=${CoinGeckoApiKey}`);
    const y = await x.json();
    return y;
  } catch (error) {
    console.log(error);
    return("OHLC Data fetch failed");
  }
}

// @params => No of Days from when Data Needed

/*
returns Json object =>
{
  "market_cap_chart": {
    "market_cap": [
      [
        1666137600000,
        966408688449.8091
      ],
      [
        1666224000000,
        952627682841.667
      ],
      [
        1666310400000,
        948870473181.127
      ]
    ],
    "volume": [
      [
        1666137600000,
        54276746009.72646
      ],
      [
        1666224000000,
        51224236590.94324
      ],
      [
        1666310400000,
        52896988973.930435
      ]
    ]
  }
}
*/

export const fetchMarketCapData = async({days})=>{
    try {
        const x = await fetch(`${coinGeckoBaseUrl}/global/market_cap_chart?days=${days}&vs_currency=usd&x_cg_pro_api_key=${CoinGeckoApiKey}`);
        const y = await x.json();
        return y;
    } catch (error) {
        console.log(error);
        return ("Error Occured when fetching Market Data");
    }
}

/*
Gets coingecko trending list= top 7 in last 24 h
*/
export const fetchTrending = async()=>{
  try {
      const x = await fetch(`${coinGeckoBaseUrl}/search/trending?x_cg_pro_api_key=${CoinGeckoApiKey}`);
      const y = await x.json();
      return y;
  } catch (error) {
      console.log(error);
      return ("Error Occured when fetching Trending Assets");
  }
}

/*
Searched Coin Gecko With Query
*/
export const searchQuery = async({query})=>{
  try {
      const x = await fetch(`${coinGeckoBaseUrl}/search?query=${query}&x_cg_pro_api_key=${CoinGeckoApiKey}`);
      const y = await x.json();
      return y;
  } catch (error) {
      console.log(error);
      return ("Error Occured when fetching search results");
  }
}

/*
get all categories supported with mkt data

@param=> order => valid values => market_cap_desc (default), market_cap_asc, name_desc, name_asc, market_cap_change_24h_desc and market_cap_change_24h_asc
*/


export const fetchCategories=async({order})=>{
  try {
    const x = await fetch(`${coinGeckoBaseUrl}/coins/categories?order=${order}&x_cg_pro_api_key=${CoinGeckoApiKey}`);
    const y = x.json();
    return y;
  } catch (error) {
    console.log(error);
    return("Fetch Categories Failed");
  }
}

export const fetchGlobalDataCoinGecko = async()=>{
  try {
    const x = await fetch(`${coinGeckoBaseUrl}/global?x_cg_pro_api_key=${CoinGeckoApiKey}`);
    const y = x.json();
    return y;
  } catch (error) {
    console.log(error)
    return("error getting global data");
  }
}