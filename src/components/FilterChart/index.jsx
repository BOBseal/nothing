"use client"
import Image from "next/image"
import Search from "../Search"
import { useState , useEffect} from "react"
import ChartCarousel from "../ChartCarousel"
import { leftArrow, rightArrow } from '@/assets'
import ResultsCard from '../Cards/resultsCard'
import { useBadgerContext } from "@/Context"
import { BiLoader } from "react-icons/bi"
import Filter from "../Filter"


const selectStyle =  'rounded-[15px] border-[3px] w-[fit-content] md:h-[fit-content] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main'

const FilterChart = ({handle}) => {
   const {setPriceChangeFilters , setTokenMetricsFilter , setLiqFilter, setVolChangeFilters,selectCard , setCardSelected , 
      priceChangeFilters , volChangeFilters , tokenMetricsFilter , currentPage , setCurrentPage, liqFilter , geckoSearch , allCoinSparkLineData , isLoading , handlerCard} = useBadgerContext()
   const [openMenu , setOpenMenu] = useState(true)
   const [fromSelected , setFromSelected] = useState(false)
   const [a , setA] = useState('0')
   const [b , setB] = useState('0')
   

   const nextPage = () => {
     if ( currentPage > 0) {
       setCurrentPage(currentPage + 1);
     }
     console.log(currentPage)
   };

   const prevPage = () => {
      if ( currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      console.log(currentPage)
    };

  return (
    <section className='w-full h-full mt-[120px] filter-chart md:mt-[0px] flex justify-center'>
    {
        <div className='flex flex-col gap-[30px] p-[20px] font-patrick'>

           <div className='flex md:flex-row flex-col-reverse md:gap-[20px] gap-[10px] items-center justify-center flex-wrap md:mt-0 mt-[-100px] z-[4]'>

                  <aside className={`flex md:flex-row flex-col md:gap-[20px] gap-[10px] items-center flex-wrap ${selectCard && "hidden"}`}>
                     <div className="flex flex-col flex-wrap items-center justify-between gap-[10px] ">
                        { !openMenu ?
                        <button className='rounded-[15px] border-[3px] w-[14rem] h-[4rem] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main justify-center items-center text-2xl font-semibold ' onClick={()=> setOpenMenu(true)}>SEARCH</button> : <button onClick={()=> setOpenMenu(false)}
                                className='rounded-[15px] border-[3px] w-[14rem] h-[4rem] border-main filter-gradient px-[10px] py-[5px] cursor-pointer text-main justify-center items-center text-2xl font-semibold '
                        >
                           SET FILTERS
                        </button>
                        }

                        {selectCard ? <button className='btn-gradient text-secondary font-semibold uppercase border-[4px] border-main w-[fit-content] h-[fit-content] md:max-w-[fit-content] font-chibold text-stroke px-[10px] py-[5px] rounded-[15px] items-center text-[16px] hover:opacity-[0.8] transition-all duration-500 ${styles}' onClick={()=> handlerCard()}> CLOSE</button> :<></>}
                     </div>
                  </aside>
           </div>

          {openMenu ?<div className="flex flex-col h-full items-center gap-[10px] z-[4] w-full ">

            
             {isLoading ? <BiLoader/>:<ResultsCard data={allCoinSparkLineData} crrPage={currentPage}/> }

            
            <div className="flex justify-between w-full">
               <button onClick={prevPage}>
                        <Image 
                        src={leftArrow} 
                        width={30} 
                        height={30} 
                        alt="left-arrow"
                        className="object-contain md:inline-block cursor-pointer" 
                        />
                        </button>
               <p className={selectStyle}>...{currentPage}...</p>
               <button onClick={nextPage}>
               <Image 
                        src={rightArrow} 
                        width={30} 
                        height={30} 
                        alt="left-arrow"
                        className="object-contain md:inline-block cursor-pointer" 
                        />
               </button>
             </div>
          </div> :

          <Filter/>
         }
        </div>
}
    </section>
  )
}

export default FilterChart