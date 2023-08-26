import { config } from "dotenv";
import { EtherScanBaseUrl } from "../constants/constants";

const EtherScanApiKey = ""; // etherscan api here for now

/*
@params =>  string for userAddress

divide return amount with divisor/decimals for that token , ie call the getTokenData first for conversions
 */
export const getERC20TokenBalance = async({tokenAddress , userAddress})=>{
    try {
        const x = await fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${userAddress}&tag=latest&apikey=${EtherScanApiKey}`);
        const y = await x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("error fetching balances");
    }
}

/*
@param = token address
@returns= >
[
      {
         "contractAddress":"0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
         "tokenName":"PancakeSwap Token",
         "symbol":"Cake",
         "divisor":"18",
         "tokenType":"ERC20",
         "totalSupply":"431889535.843059000000000000",
         "blueCheckmark":"true",
         "description":"PancakeSwap is a yield farming project whereby users can get FLIP (LP token) for staking and get CAKE token as reward. CAKE holders can swap CAKE for SYRUP for additional incentivized staking.",
         "website":"https://pancakeswap.finance/",
         "email":"PancakeSwap@gmail.com",
         "blog":"https://medium.com/@pancakeswap",
         "reddit":"",
         "slack":"",
         "facebook":"",
         "twitter":"https://twitter.com/pancakeswap",
         "bitcointalk":"",
         "github":"https://github.com/pancakeswap",
         "telegram":"https://t.me/PancakeSwap",
         "wechat":"",
         "linkedin":"",
         "discord":"",
         "whitepaper":"",
         "tokenPriceUSD":"23.9300000000"
      }
   ]
*/

export const getTokenInfoByAddress=async({tokenAddress})=>{
    try {
        const x = await fetch(`https://api.etherscan.io/api
        ?module=token
        &action=tokeninfo
        &contractaddress=${tokenAddress}
        &apikey=${EtherScanApiKey}`);
        const y = x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("Error While Fetching Token Info By Address");
    }
}

/*
get token holder list

has pagination
*/

export const getHolderList = async({tokenAddress, page , offset})=>{
    try {
        const x = await fetch(`https://api.etherscan.io/api
        ?module=token
        &action=tokenholderlist
        &contractaddress=${tokenAddress}
        &page=${page}
        &offset=${offset}
        &apikey=${EtherScanApiKey}`);
        const y = await x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("Error While Getting Token Holders Info");
    }
}

/* */

export const getNativeBalance = async({address})=>{
    try {
        const x = await fetch(`https://api.etherscan.io/api
        ?module=account
        &action=balance
        &address=${address}
        &tag=latest
        &apikey=${EtherScanApiKey}`);
        return x;
    } catch (error) {
        console.log(error);
        return("error while getting BNB balance");
    }
}

/* 
@param=>
Timestamp => BlockTimestamp

Has Pagination
returns historic normal transactions
*/

export const getNormalTx = async({address , sTimeStamp , eTimeStamp , page , offset })=>{
    try {
        const x = await fetch(`https://api.etherscan.io/api
        ?module=account
        &action=txlist
        &address=${address}
        &startblock=${sTimeStamp}
        &endblock=${eTimeStamp}
        &page=${page}
        &offset=${offset}
        &sort=asc
        &apikey=${EtherScanApiKey}`);
        const y = x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("Error Getting Tx History of Address");
    }
}

/* 
Same As Normal Tx hook
*/

export const getInternalTx = async({address , sTimeStamp , eTimeStamp , page , offset })=>{
    try {
        const x = await fetch(`https://api.etherscan.io/api
        ?module=account
        &action=txlistinternal
        &address=${address}
        &startblock=${sTimeStamp}
        &endblock=${eTimeStamp}
        &page=${page}
        &offset=${offset}
        &sort=asc
        &apikey=${EtherScanApiKey}`);
        const y = x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("Error Getting Tx History of Address");
    }
}

/*
Get List of ERC20 Transfer Events

has pagination
*/

export const getErc20Tx = async({token,address , sTimeStamp , eTimeStamp , page , offset })=>{
    try {
        const x = await fetch(`https://api.etherscan.io/api
        ?module=account
        &action=tokentx
        &contractaddress=${token}
        &address=${address}
        &page=${page}
        &offset=${offset}
        &startblock=${sTimeStamp}
        &endblock=${eTimeStamp}
        &sort=asc
        &apikey=${EtherScanApiKey}`);
        const y = x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("Error Getting Tx History of Address");
    }
}