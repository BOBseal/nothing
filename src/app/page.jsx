"use client"
import { FilterChart, DisplayChart } from '@/components'
import { useEffect, useState } from 'react'
import { useBadgerContext } from '@/Context'
//import ChartPage from '../components/CustomCharts/card'
import { AnimatePresence ,motion} from 'framer-motion'

const Home = () => {
    const{geckoSearch , ethCoinList , fetchLists , fetchCoinData , selectCard , sm, handlerCard,setCardSelected} = useBadgerContext();
     const [tokens, setTokens] = useState([])
     const [showDiv, setShowDiv] = useState(false);
     
    //  EXAMPLE OF FETCHING API FROM BITQUERY
    //  useEffect(() => {
    //      const getTokens = async() => {
    //           const data = await fetch(`https://graphql.bitquery.io`, {
    //           method: "POST",
    //           headers: {
    //             'Content-Type': "application/json",
    //             'X-API-KEY': 'BQY49xcdnlISaS93oY4lQN2cDBaYZfhu'
    //           },
    //           body: JSON.stringify({ query }),
    //           next: {
    //             revalidate: 5
    //           }
    //       })  
    //       const res = await data.json()

    //       console.log(res.data.ethereum.address[0].balances, "okay")
    //       setTokens(res.data.ethereum.address[0].balances)
    //       }

    //         getTokens()
    //  }, [])

    useEffect(() => {
      setTimeout(() => {
        setShowDiv(true);
      }, 500);
    }, []);

  return (
    <section className='max-h-screen h-screen min-w-screen max-w-screen homeBg-desktop bg-no-repeat bg-cover bg-[right_0px_bottom_0px] gap-[30px] lg:gap-[60px]'>
      <div className="h-full w-full fixed object-cover top-14 md:top-0 right-0 bg-[#252C32] -z-[9] header-mobile bg-cover bg-[right_opx,bottom_0px] bg-no-repeat" />
      
      <div className={`flex flex-col justify-center h-11/12`}>
      {/* Apply sliding animation*/} 
      <AnimatePresence> { selectCard  &&  
      <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
          <DisplayChart className='flex z-[50]  w-screen border-[3px]border-main rounded-[20px] bg-black ' />
      </motion.aside>}
      </AnimatePresence>

       <AnimatePresence>{!selectCard &&
      <motion.aside className={``}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <FilterChart  />
      </motion.aside>
}      </AnimatePresence>
      </div>
    </section>
  )
}

export default Home