"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { ethers } from "ethers"
// import { toast } from 'react-toastify';
import { EthNetworkId_hex ,ETHNetwork } from "./components/constants/networks";
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
    searchQuery,
    fetchCoinMarketData24hoursRangeFromToday,
    fetchCoinMarketData24hoursRange} from "./components/requests/fetchGecko";

import { 
    fetchPoolInfo , 
    fetchAllLatestPools , 
    fetchLatestPools_Network , 
    fetchTerminalSupportedNetworks , 
    fetchTerminalTokenInfo , 
    fetchTopPools_Network 
} from "./components/requests/fetchGeckoTerminal";

import { 
    getERC20TokenBalance, 
    getHolderList, 
    getErc20Tx , 
    getNormalTx , 
    getInternalTx , 
    getNativeBalance , 
    getTokenInfoByAddress 
} from "./components/requests/fetchEtherscan";

const BadgerContext = createContext()
const baseUrl = "http://localhost:8000/api"

export const BadgerProvider = ({children}) => {
        const [isLogged , setIsLogged] = useState(false) // helper state
        const [guestUser , isGuestUser] = useState(false) // handle if user continue as guest
        const [isLoading , setIsLoading] = useState(false)
        const [error , setError] = useState("")
        const [network , setNetwork] = useState("")
        const [isMenuOpen, setIsMenuOpen] = useState(false)
        const [coinList , setCoinList] = useState({})
        const [ ethCoinList , setEthCoinList] = useState([])
        const [ ethCoinListAdr , setEthCoinListAdr] = useState([])
        const [ ethCoinListInfo , setEthCoinListInfo] = useState([])
        const [ ethCoinListMarketData , setEthCoinMarketData] = useState([])
        const [allCoinSparkLineData , setSparklineData] = useState([]);
        const [sparkData , setSparkData] = useState([])
        const [currentId ,setCurrentId] = useState('')
        const [user , setUser] = useState("") // user metamask address
        const [form , setForm] = useState({
            name: "",
            wallet: "",
            image: "",
            email: ""
        })
        const [userInfo , setUserInfo] = useState({})
        const [userInfoNotCreated , setUserInfoNotCreated] = useState(false)
        const [userEtherBalance , setUserEtherBalance] = useState("")
        const [searchQueryInput , setSearchQueryInput] = useState('')
        const [searchResult , setSearchResult] = useState({})
        const [priceChangeFilters , setPriceChangeFilters] = useState({ // this is for marketcap
            direction:"",
            percent:"",
            fromTime:"",
            toTime:"",
            isSet: false
         })
         const [volChangeFilters , setVolChangeFilters] = useState({
            direction:"",
            percent:"", 
            timeFrame:"",
            isSet: false
         })
         const [tokenMetricsFilter , setTokenMetricsFilter] = useState({
            fromTime:"",
            holdersSet:false,
            maxHoldersNum:"",
         })
         const [liqFilter , setLiqFilter] = useState({
            minLiq:"",
            isSet: false
         })
         
         // for card management
         const [selectedId , setSelectId] = useState('')
         const [selectCard , setCardSelected] = useState(true)
         const [currentPage, setCurrentPage] = useState(1);
    

       //  const []


       useEffect(() => {
        try{
         if(ethCoinList.length == 0){fetchLists();}
        }
        catch(Error){
          console.log(Error)
        }
       }, [ethCoinList ])


        const connect = async()=> {
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

        const handlerCard = async()=>{
          if(selectCard == false){
             setCardSelected(true)
          }
          if(selectCard == true){
             setCardSelected(false)
          }
        }

        const tier =async()=>{
          try {
            
          } catch (error) {
            alert("Tier fetching went wrong")
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
    
        const connectWallet = async()=>{
            try {
                const {ethereum} = window;
    
                if(!ethereum){
                    alert("Continuing as Guest")
                    isLogged(true);
                }
                let chainId = await ethereum.request({method: "eth_chainId"});
                console.log(chainId);
                if (chainId !== EthNetworkId_hex){
                    changeNetwork({network: ETHNetwork});
                }
                const accounts = await connect();
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

        const addUser = async(userData) => {
          const { name, wallet, email, image } = userData;
          const formData = new FormData()
  
          if(image) {
              formData.append("image", image)
              formData.append("image-name", image.name)
          }
  
          try {
              const url = `${baseUrl}/user?name=${name}&wallet=${wallet}&email=${email}`
              const user = await fetch(url, {
                          method: "POST",
                          body: formData
              })
  
              console.log(user)
          } catch (error) {
              console.log(error)
          }
                
      }
  
      // PARAM1 => userId is an user id that u want to update
      // PARAM2 => userData is an user updated data pass as an object
      const updateUser = async(userData, userId) => {
          const { name, wallet, email, image } = userData;
          const formData = new FormData()
  
          if(image) {
              formData.append("image", image)
              formData.append("image-name", image.name)
          }
  
          try {
              const url = `${baseUrl}/user/${userId}?name=${name}&wallet=${wallet}&email=${email}`
              const user = await fetch(url, {
                          method: "PUT",
                          body: formData
              })
  
              
          } catch (error) {
              console.log(error)
          }
                
      }
  
      // GET USER SHOULD BASED ON THEIR REGISTERED WALLET
      /*
          @userWallet => pass an user wallet into this function params
      **/
      const getUser = async(userWallet) => {
          const res = await fetch(`${baseUrl}/user/${userWallet}`)
          const { user }  = await res.json();
  
          console.log(user)
          if(user) {
              setUserInfo(user);
          }
      }
  
      const getAllUsers = async() => {
          const res = await fetch(`${baseUrl}/user/all-users`)
          const  userr  = await res.json()
          console.log(userr);
      }

      async function fetchLists(){
        try {
            setIsLoading(true)
            const cL =await fetchCoinList();
            setCoinList(cL);
            const r = cL.filter(a=> a.platforms && a.platforms.ethereum);
            const addresses = r.map(e=> e.platforms.ethereum);
            const idss = r.map(c=> c.id);
            //const idsString = idss.join(',');
            //console.log(idsString)
            const allSparkData = [];
            const batchSize = 250;
            for (let batchStart = 0; batchStart < 250; batchStart += batchSize) {
              const batchEnd = batchStart + batchSize;
              const batchIds = idss.slice(batchStart, batchEnd).join(',');
            
              const sparkData = await fetchCoinMarketData({
                ids: batchIds,
                pageNo: Math.floor(1 / batchSize),
                bool: 'true',
                timeRange: '1h,24h,7d,14d,30d,200d,1y'
              });
          
              allSparkData.push(sparkData);
            }
            const reslt =  await Promise.all(allSparkData);

            const flattenedSparkData = reslt.flat(); // Flattening the array of arrays

            const sortedData = flattenedSparkData.sort((a, b) => {
              return b.market_cap - a.market_cap;
            });
            setSparklineData(sortedData); // renderData to be viewed in resultCard
            //console.log(sortedData)// array of objects with data 
            setEthCoinList(idss);
            setEthCoinListAdr(addresses);
            setIsLoading(false)
            setSparkData(flattenedSparkData); // to use in handlers
        } catch (error) {
            console.log(error)
            alert("Failed to connect to server , something went wrong")
            setError("");
        }
    }

    async function fetchCoinDataa(){ // this fetches all eth coin info -- does incl
        try {
            const promises=[];
            const resultsArray=[];
            for(let i = 0 ; i< 5; i++)    
                    {
                        const id = ethCoinList[`${i}`];
                        await new Promise(resolve => setTimeout(resolve, 150)); //130 on pro
                        const coinData = await fetchCoinData({ id: id }); // Assuming fetchCoinData returns an object
                        const resultWithId = { id: id, data: coinData }; // Adding token ID to the fetched data 
                        promises.push(resultWithId)
                    }
                
                const results = await Promise.all(promises);   
                results.forEach(result => {
                    resultsArray.push(result); // Modify this based on the actual structure of the fetched data
                });
                console.log(resultsArray)
                setEthCoinListInfo(resultsArray)
                return resultsArray
        } catch (error) {
            console.log(error);
            alert("Something went wrong Please reload")
            setError("Errored market data fetch")
        }
    }

    const fetchMarketData=async({fromTime})=>{
        try {
          setIsLoading(true);
            const promises=[];
            const resultsArray=[];
        
                for(let i = 0 ; i< sparkData.length; i++)    
                    {
                        const id = sparkData[i].id;
                        await new Promise(resolve => setTimeout(resolve, 140));
                        const a =await fetchCoinMarketData24hoursRangeFromToday({id: id , daysAgo: fromTime}) // marketcap data call  return object that has arrays
                        const resObj = {id: id , data: a}
                        promises.push(resObj);
                    }
                
                const results = await Promise.all(promises);   
                results.forEach(result => {
                    resultsArray.push(result); // Modify this based on the actual structure of the fetched data
                });
                console.log(results)
                setIsLoading(false);
                setEthCoinMarketData(results)
                return resultsArray;
            } catch (error) {
            
        }n 
    }

    const geckoSearch=async()=>{
      //from here on it is failing 
      
        try {
            setIsLoading(true);
            if(ethCoinListMarketData.length == 0 && priceChangeFilters.fromTime && priceChangeFilters.toTime ){
              await fetchMarketData({id:"bitcoin" ,fromTime : priceChangeFilters.fromTime , toTime : priceChangeFilters.toTime});
            }
            if(ethCoinListMarketData.length ==0){

            }
            const a =[]; 
            const b =[]; // array of objects [{id , data , marketData}]
            const r =[]
            if(sparkData.length >0 && ethCoinListMarketData.length>0){
              sparkData.forEach(element => {
                const elId = element.id;
                a.push(elId);
              });
              ethCoinListMarketData.forEach(e=>{
                const object = { id: a[e] , data:sparkData[e] , marketData: ethCoinListMarketData[e]}
                b.push(object);
              })
            }
           
            if(priceChangeFilters.direction =="positive" ){
              const filteredPositiveMarketCap = filteredObjects.filter(obj => {
                const initialMarketCap = obj.marketData.market_caps[0][1];
                const latestMarketCap = obj.marketData.market_caps[obj.marketData.market_caps.length - 1][1];
                return latestMarketCap > initialMarketCap;
            });
            console.log(filteredPositiveMarketCap)
            }
            if(priceChangeFilters.direction == "negative"){
              const filteredNegativeMarketCap = filteredObjects.filter(obj => {
                const initialMarketCap = obj.marketData.market_caps[0][1];
                const latestMarketCap = obj.marketData.market_caps[obj.marketData.market_caps.length - 1][1];
                return latestMarketCap < initialMarketCap;
            });

            console.log(filteredNegativeMarketCap)
            
            }
        } catch (error) {
            console.log(error)
            setError("Search Failed")
        }
    }


    return (
        <BadgerContext.Provider value={{
           addUser,
           updateUser,
           getUser,
           user,
           connectWallet,
           userEtherBalance , isLogged , getUserEthBalances, 
        geckoSearch , searchQueryInput , searchResult,setSearchQueryInput , guestUser ,
        isGuestUser,isMenuOpen, setIsMenuOpen, userInfo, getAllUsers,
        setPriceChangeFilters , setTokenMetricsFilter , setLiqFilter, setVolChangeFilters , 
        priceChangeFilters , volChangeFilters , tokenMetricsFilter , liqFilter, ethCoinList , coinList, fetchLists,
        ethCoinListInfo , ethCoinListMarketData , fetchMarketData , fetchCoinDataa,selectCard , setCardSelected
        ,allCoinSparkLineData , isLoading, form, setForm, currentPage , setCurrentPage ,currentId ,setCurrentId, handlerCard,
         }} >
            {children}
        </BadgerContext.Provider>
    )
}


export const useBadgerContext = () => useContext(BadgerContext)


/*
array a =[
{
"prices": [
    [
      1392595200000,
      645.14
    ]
  ],
  "market_caps": [
    [
      1392595200000,
      8005429360
    ]
  ],
  "total_volumes": [
    [
      1392595200000,
      48516100
    ]
  ]
},{
"prices": [
    [
      1392595200000,
      645.14
    ]
  ],
  "market_caps": [
    [
      1392595200000,
      8005429360
    ]
  ],
  "total_volumes": [
    [
      1392595200000,
      48516100
    ]
  ]
},{
"prices": [
    [
      1392595200000,
      645.14
    ]
  ],
  "market_caps": [
    [
      1392595200000,
      8005429360
    ]
  ],
  "total_volumes": [
    [
      1392595200000,
      48516100
    ]
  ]
}
]

array b =[id1,id2,id3] 

here are two arrays , the array a stores objects , and each object index is equal to id index in arrayb , ie array a corresponds to array b












const arrayA = [
  {
    "prices": [[1392595200000, 645.14]],
    "market_caps": [[1392595200000, 8005429360]],
    "total_volumes": [[1392595200000, 48516100]]
  },
  {
    "prices": [[1392595200000, 645.14]],
    "market_caps": [[1392595200000, 8005429360]],
    "total_volumes": [[1392595200000, 48516100]]
  },
  {
    "prices": [[1392595200000, 645.14]],
    "market_caps": [[1392595200000, 8005429360]],
    "total_volumes": [[1392595200000, 48516100]]
  }
];

const arrayB = ["id1", "id2", "id3"];

const modifiedArrayA = arrayA.map((obj, index) => {
  const newObj = { ...obj };
  newObj[arrayB[index]] = true;
  return newObj;
});

console.log(modifiedArrayA);










filter through this array for market_caps 

[ id:{
  "prices": [
    [
      1392595200000,
      645.14
    ],
    [
      1392681600000,
      625.01
    ],
    [
      1392768000000,
      620.99
    ],
    [
      1392854400000,
      593.89
    ]
  ],
  "market_caps": [
    [
      1392595200000,
      8005429360
    ],
    [
      1392681600000,
      7758139753
    ],
    [
      1392768000000,
      7711283048
    ],
    [
      1392854400000,
      7377405511
    ]
  ],
  "total_volumes": [
    [
      1392595200000,
      48516100
    ],
    [
      1392681600000,
      22066400
    ],
    [
      1392768000000,
      13276100
    ],
    [
      1392854400000,
      35743400
    ]
  ]
},id:{samilar objects 2},id:{... similar object3}]

*/