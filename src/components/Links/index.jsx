"use client"
import Link from "next/link"
import CustomButton from "../CustomButton"
import { useBadgerContext } from '@/Context'

const linkStyles = "min-w-[153px] min-h-[54px] leading-[55px] bg-cover bg-no-repeat rounded-[10px] text-main text-center uppercase font-bold hover:opacity-[0.8] transition-all duration-500 font-chibold btn-bg"

const Links = ({ styles, linkStyle, restLinks, links, setIsOpen }) => {
      const { connectWallet ,user , guestUser, isGuestUser, isLogged ,isMenuOpen, setIsMenuOpen} = useBadgerContext()

      const handlerLogin = async()=>{
         try {
         if(!isLogged) {
            connectWallet();
         }
         if(isLogged && !user){
            isGuestUser(true);
         }
         if(isMenuOpen){
            setIsMenuOpen(false)
         }
         if(!isMenuOpen){
            setIsMenuOpen(true)
         }
         if(user || isGuestUser) {
            setIsMenuOpen(false)
         }
      } catch (error) {
            
      }
      }

  return (
    <ul className={`flex ${styles} z-[2]`}>
       <Link 
          href="/" 
          className={`${linkStyles}`}
          onClick={()=>setIsMenuOpen(false)}
          > Home
        </Link>
       <Link 
          href="/profile" 
          className={`${linkStyles}`}
          onClick={()=>setIsMenuOpen(false)}
       >Profile
       </Link>
       
       <Link 
          href="/about" 
          className={`${linkStyles}`}
          onClick={()=>setIsMenuOpen(false)}
       >  About
       </Link>
       <Link 
          href="/faqs" 
          className={`${linkStyles}`}
          onClick={()=>setIsMenuOpen(false)}
       >  Faqs
       </Link>
       {isLogged ?<div>
         {user ? <div onClick={()=> setIsMenuOpen(false)} className={linkStyles}>{user.slice(0,3)}...{user.slice(38)}</div>:
         <div className={linkStyles} onClick={()=> setIsMenuOpen(false)}>Guest User</div>}
       </div>: <CustomButton 
          title="Connect" 
          styles={`min-w-[153px] h-[54px] leading-[50px] bg-cover bg-no-repeat rounded-[10px] text-main text-center uppercase font-bold hover:opacity-[0.8] transition-all duration-500 font-chibold btn-bg`}
          handleClick={()=>handlerLogin()}
        />}
    </ul>
  )
}

export default Links