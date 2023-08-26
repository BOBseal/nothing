/// IMPORTANT: GECKO TERMINAL IS IN BETA , UPDATE IN FUTURE TO ACCOMODATE AUTH

import { GeckoTermBaseUrl } from "../constants/constants";

export const fetchTerminalSupportedNetworks=async()=>{
    try {
        const x = await fetch(`https://api.geckoterminal.com/api/v2/networks?page=1`);
        const y = await x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("");
    }
}

export const fetchTerminalTokenInfo=async({networkId , token})=>{
    try {
        const x = await fetch(`https://api.geckoterminal.com/api/v2/networks/${networkId}/tokens/${token}?include=top_pools`);
        const y = await x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("");
    }
}

export const fetchAllLatestPools=async()=>{
    try {
        const x = await fetch(`https://api.geckoterminal.com/api/v2/networks/new_pools`);
        const y = await x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("");
    }
}

export const fetchTopPools_Network=async({networkId})=>{
    try {
        const x = await fetch(`https://api.geckoterminal.com/api/v2/networks/${networkId}/pools`);
        const y = await x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("");
    }
}


export const fetchLatestPools_Network=async({networkId})=>{
    try {
        const x = await fetch(`https://api.geckoterminal.com/api/v2/networks/${networkId}/new_pools`);
        const y = await x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("");
    }
}

export const fetchPoolInfo=async({networkId , poolAddress})=>{
    try {
        const x = await fetch(`https://api.geckoterminal.com/api/v2/networks/${networkId}/pools/${poolAddress}`);
        const y = await x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("");
    }
}

