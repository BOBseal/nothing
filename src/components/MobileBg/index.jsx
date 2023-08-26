import Image from "next/image"
import { treeBgMobile, bushesBgMobile, treeMobile, hillBgMobile, groundMobile, ground2Mobile } from "@/assets"

const MobileBg = ({ treeBgMobileStyles, bushesBgMobileStyles, treeMobileStyles, hillBgMobileStyles, groundMobileStyles, ground2MobileStyles, parentStyle }) => {
  return (
    <div className={`relative object-contain`}>
        <Image 
            src={treeBgMobile} 
            width={100} 
            height={100} 
            className={`${treeBgMobileStyles}`} 
        />
        <Image 
            src={bushesBgMobile} 
            width={100} 
            height={100} 
            className={`${bushesBgMobileStyles}`} 
        />
        <Image 
            src={treeMobile} 
            width={100} height={100} 
            className={`${treeMobileStyles}`} 
                    />
        <Image 
            src={hillBgMobile} width={100} 
            height={100} className={`${hillBgMobileStyles}`} 
                    /> 
        <Image 
            src={groundMobile} 
            width={100} height={100} 
            className={`${groundMobileStyles}`} 
                    /> 
        <Image 
            src={ground2Mobile} 
            width={100} height={100} 
            className={`${ground2MobileStyles}`} 
        /> 
</div>
  )
}

export default MobileBg