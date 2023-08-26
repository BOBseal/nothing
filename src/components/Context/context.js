"use client"
import React,{useState , useEffect} from "react";
import { DBTestUrl } from "../constants/constants";
import { EthNetworkId_hex ,ETHNetwork } from "../constants/networks";
import { ethers } from "ethers";
import { 
    getERC20TokenBalance, 
    getHolderList, 
    getErc20Tx , 
    getNormalTx , 
    getInternalTx , 
    getNativeBalance , 
    getTokenInfoByAddress 
} from "../requests/fetchEtherscan";

import { 
    fetchCoinList , 
    fetchCoinData, 
    fetchCategories , 
    fetchCoinMarketData , 
    fetchCoinOHLC , 
    fetchCoinPrice, 
    fetchGainersAndLosersUSD , 
    fetchGlobalDataCoinGecko , 
    fetchMarketCapData , 
    fetchTrending , 
    searchQuery} from "../requests/fetchGecko";

import { 
    fetchPoolInfo , 
    fetchAllLatestPools , 
    fetchLatestPools_Network , 
    fetchTerminalSupportedNetworks , 
    fetchTerminalTokenInfo , 
    fetchTopPools_Network 
} from "../requests/fetchGeckoTerminal";



export const BadgerContext= React.createContext();
export const BadgerProvider= ({children})=>{
    const [isLogged , setIsLogged] = useState(false) // helper state
    const [guestUser , isGuestUser] = useState(false) // handle if user continue as guest
    const [isLoading , setIsLoading] = useState(false)
    const [error , setError] = useState("")
    const [network , setNetwork] = useState("")
    
    const [user , setUser] = useState("") // user metamask address
    const [addUserForm , setAddUserForm] = useState({
        name: "",
        wallet: "",
        image: "",
        email: ""
    })
    const [userEtherBalance , setUserEtherBalance] = useState("")
    const [searchQueryInput , setSearchQueryInput] = useState('')
    const [searchResult , setSearchResult] = useState([])
    
    //filters


    const connectWallet = async()=> {
        try {
            if(!window.ethereum) return console.log("INSTALL METAMASK OR WEB3-Wallet");
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const firstAccount = accounts[0];
           return firstAccount;
        } catch (error) {
            console.log(error);
        }  
    }

    const changeNetwork = async({network})=>{
        try {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: network,
            });
        } catch (error) {
            console.log(error);
            alert("error changing network");
        }
    }

    const connect = async()=>{
        try {
            const {ethereum} = window;

            if(!ethereum){
                alert("Install Metamask First")
            }
            let chainId = await ethereum.request({method: "eth_chainId"});
            console.log(chainId);
            if (chainId !== EthNetworkId_hex){
                changeNetwork({network: ETHNetwork});
            }
            const accounts = await connectWallet();
            setUser(accounts);
            setIsLogged(true);
            setNetwork(await ethereum.request({method: "eth_chainId"})); 
        } catch (error) {
            console.log(error);
            setError("Please Install Metamask");
        }
    }

    const getUserEthBalances = async()=>{
        try {
            if(user){
            setIsLoading(true);
            const ethereum = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const balance = await provider.getBalance(user);
                const balanceInEth = ethers.utils.formatEther(balance);
            setUserEtherBalance(balanceInEth);
            }
            else setError("Install Metamask")
            setIsLoading(false);
            } 
        } catch (error) {
            console.log(error);
            setError("Failed Balances Fetch")
        }
    }

    const addUserAcc = async(e)=>{
        setIsLoading(true);
        e.preventDefault();
        const {name , wallet , email , image} = addUserForm;
        const formData = new FormData();

        if(image){
            formData.append("image", image)
            formData.append("image-name", image.name)
        }

        try {
            const url = `${DBTestUrl}user?name=${name}&wallet=${wallet}&email=${email}`
            const user = await fetch(url , {
                method: "POST",
                body: formData
            })
            console.log(user);
        setIsLoading(false);
        } catch (error) {
            console.log(error);
            setError("Add User Account Failed");
        }
    }

    const geckoSearch = async()=>{
        try {
            if(searchQueryInput){
            setIsLoading
            const x = await searchQuery({query: searchQueryInput});
            const r = await x.coins;
            setSearchResult(r)
            alert("Search Results Are Here")
            setIsLoading(false)
            }else {
            setError("Please Enter Query First")
            }
        } catch (error) {
            console.log(error);
            setError("Search Failed")
        }
    }

    return(
        <BadgerContext.Provider value={{connect, user , userEtherBalance , isLogged , getUserEthBalances
        , geckoSearch , searchQueryInput , searchResult,setSearchQueryInput
        }}>
            {children}
        </BadgerContext.Provider>
    )
}