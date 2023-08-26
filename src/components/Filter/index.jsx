import React from 'react'
import { useBadgerContext } from '@/Context'

const selectStyle =  'rounded-[15px] border-[3px] w-[fit-content] md:h-[fit-content] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main'


const Filter = () => {
  const {setPriceChangeFilters , setTokenMetricsFilter , setLiqFilter, setVolChangeFilters,selectCard , setCardSelected , 
    priceChangeFilters , volChangeFilters , tokenMetricsFilter , currentPage , setCurrentPage, liqFilter , geckoSearch , allCoinSparkLineData , isLoading} = useBadgerContext()


    const handlePriceDirectionChange = (event) => {
      const selectedDirection = event.target.value;
      setPriceChangeFilters((prevFilters) => ({
      ...prevFilters,
      direction: selectedDirection
      }));
   };

   const handlePricePercentChange = (event) => {
      const selectedPercent = parseInt(event.target.value);
      setPriceChangeFilters((prevFilters) => ({
      ...prevFilters,
      percent: selectedPercent
      }));
   };

   const handlePriceFromTimeChange = (event) => {
      const selectedFromTime = event.target.value;
      setPriceChangeFilters((prevFilters) => ({
      ...prevFilters,
      fromTime: selectedFromTime
      }));
   };

   const handleVolDirectionChange = (event) => {
      const selectedDirection = event.target.value;
      setVolChangeFilters((prevFilters) => ({
        ...prevFilters,
        direction: selectedDirection
      }));
    };
  
    const handleVolPercentChange = (event) => {
      const selectedPercent = parseInt(event.target.value);
      setVolChangeFilters((prevFilters) => ({
        ...prevFilters,
        percent: selectedPercent
      }));
    };
  
    const handleVolTimeFrameChange = (event) => {
      const selectedTimeFrame = event.target.value;
      setVolChangeFilters((prevFilters) => ({
        ...prevFilters,
        timeFrame: selectedTimeFrame
      }));
    };
  
    // Token Metrics Filters
    const handleTokenMetricsFromTimeChange = (event) => {
      const selectedFromTime = event.target.value;
      const time = new Date(selectedFromTime).getTime() / 1000;
      setTokenMetricsFilter((prevFilters) => ({
        ...prevFilters,
        fromTime: time
      }));
      console.log(tokenMetricsFilter.fromTime)
    };  
    const handleMaxHoldersChange = (event) => {
      const selectedMaxHolders = parseInt(event.target.value);
      setTokenMetricsFilter((prevFilters) => ({
        ...prevFilters,
        holdersSet: true,
        maxHoldersNum: selectedMaxHolders
      }));
      
    };
  
  
    const handleLiqMinLiqChange = (event) => {
      const selectedMinLiq = parseInt(event.target.value);
      setLiqFilter((prevFilters) => ({
        ...prevFilters,
        minLiq: selectedMinLiq
      }));
    };
  return (
    <div className="flex flex-row items-center z-[4] h-screen md:h-full justify-center">
            <aside className='flex  flex-col md:gap-[40px] gap-[10px] md:items-center justify-center items-center flex-wrap'>
                  <h4 className='md:text-[2rem] text-[18px] text-secondary font-medium'> Filtered By : </h4>
                  
                  <div className='grid grid-cols-1 items-center p-[20px] gap-y-[30px] md:gap-x-[30px] lg:gap-x-[130px] md:grid-cols-3 justify-between -ml-[30px]'>
                     
                     {/* Filters */}
                     
                     <div className='rounded-[15px] border-[3px] w-[16rem] lg:w-[22rem] md:h-[25rem] justify-evenly border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main items-center flex flex-col gap-2'>
                        
                        <p className="text-[1rem]">Market Cap Change</p>
                        
                        <div className="flex flex-col justify-center items-center gap-4">
                        
                        <select className={selectStyle} value={priceChangeFilters.direction} onChange={handlePriceDirectionChange}>
                           <option className={selectStyle} value='positive'>Positive Change %</option>
                           <option className={selectStyle} value='negative'>Negative Change %</option>
                        </select>
                        
                        </div>
                        <p>{priceChangeFilters?.percent || "Select Percent"}%</p>
                        <input type='range' min="0" max="100" step="1" value={priceChangeFilters.percent} onChange={handlePricePercentChange} className='bg-transparent w-full h-11/12 justify-center border'/>
                     
                        Time Range: 
                        <div className="rounded-[15px] border-[3px] w-11/12 md:h-[fit-content] border-main flex items-center justify-between filter-gradient px-[10px] py-[5px] cursor-pointer text-main">
                           From:
                           
                              <select className={`${selectStyle} w-4/6 `} onChange={handlePriceFromTimeChange}>
                              <option className={selectStyle} value='1'>5m</option>
                              <option className={selectStyle} value='2'>1hr </option>
                              <option className={selectStyle} value='2'>6hr</option>
                              <option className={selectStyle} value='1'>1d</option>
                              <option className={selectStyle} value='7'>7d</option>
                              <option className={selectStyle} value='30'>1Mo</option>
                              <option className={selectStyle} value='90'>3Mo</option>
                              <option className={selectStyle} value='180'>6Mo</option>
                              <option className={selectStyle} value='365'>1y</option> {/* These Inputs are adjusted according to api data granularity --1 day from current time = 5 minute interval data 1 - 90 days from current time = hourly data above 90 days from current time = daily data (00:00 UTC) */}
                              </select>
                           
                        </div>
                     </div>

                     <div className='rounded-[15px] border-[3px] w-[16rem] lg:w-[22rem] md:h-[25rem] justify-between pt-[1.5rem] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main items-center flex flex-col gap-2'>
                        <p className="text-[1rem]">Volume Change</p>
                        <div className="flex flex-col justify-center items-center gap-4">
                        <select className='rounded-[15px] border-[3px] w-full md:h-[fit-content] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main'
                        onChange={handleVolDirectionChange}
                        >
                           <option className={selectStyle} value='positive'>Positive Change %</option>
                           <option className={selectStyle} value='negative'>Negative Change %</option>
                        </select>
                        

                        </div>
                        <p>{volChangeFilters?.percent || "Select Percent"}%</p>
                        <input type='range' min="0" max="100" step="1" className='bg-transparent w-full h-11/12 justify-center border' onChange={handleVolPercentChange}/>
                     
                        <div className="rounded-[15px] justify-center flex flex-col items-start border-[3px] w-11/12 md:h-[fit-content] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main">
                        Time Range:  
                        <select className='rounded-[15px] border-[3px] w-full md:h-[fit-content] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main'
                        onChange={handleVolTimeFrameChange}
                        >
                           <option className={selectStyle} value='300'>5 min</option>
                           <option className={selectStyle} value='3600'>1 hr</option>
                           <option className={selectStyle} value='21600'>6 hr</option>
                           <option className={selectStyle} value='86400'>1 d</option>
                           <option className={selectStyle} value='604800'>7 d</option>
                        </select>
                        </div>

                        <div className="flex flex-col justify-center items-start rounded-[15px] border-[3px] w-11/12 md:h-[fit-content] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main">
                        Set Minimum Liquidity in $
                        <input type={'number'} step='10000' min={0} className="rounded-[15px] border-[3px] w-full h-[3rem] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main" onClick={handleLiqMinLiqChange}/>
                        </div>
                     </div>

                     <div className='rounded-[15px] border-[3px] w-[16rem] lg:w-[22rem] justify-between pt-[1.6rem] pb-[5rem] md:h-[25rem] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main items-center flex flex-col gap-2'>
                        
                        <p className="text-[1rem]">Token Metrics</p>
                        
                        <div className="rounded-[15px] border-[3px] w-11/12 md:h-[fit-content] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main">
                           Pool Creation Time 
                        <input type="datetime-local" placeholder="From timestamp" className="rounded-[15px] border-[3px] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main w-full " onChange={handleTokenMetricsFromTimeChange}/> 
                     </div>

                        
                           <div className='rounded-[15px] border-[3px] w-11/12 md:h-[fit-content] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main'>
                              <p>Set Max Holders</p>
                              <input type={'number'} step='500' min={0} className="bg-transparent h-11/12 rounded-[15px] border-[3px] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main w-full " onChange={handleMaxHoldersChange}/>
                           </div>
                        
                     </div>

                  </div>
                  <button className={selectStyle}>SEARCH FILTERS</button>
               </aside>
          </div>
  )
}

export default Filter