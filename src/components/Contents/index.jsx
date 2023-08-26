// "use client"

const Contents = ({ text, title, aboutPage }) => {
  return (
    <div className={`flex flex-col contents-gradient w-[90%] h-[fit-content] top-12 mx-auto md:mt-[20px] border-[3px] border-main p-[20px] rounded-[20px] md:static relative ${aboutPage ? "top-[30px]" : "top-[30px]"}`} >
        <div className='flex flex-col items-center gap-[10px]'>
            <h2 className='font-chibold global-text_shadow font-bold md:text-[37px] text-[20px] uppercase text-secondary tracking-wide'> {title} </h2>
            <span className='h-[4px] bg-main w-[70px] mt-[-15px] font-patrick' />
        </div>

        <p className='font-patrick font-medium md:text-[28px] mt-[50px] text-[18px] text-main'> {text} </p>
    </div>
  )
}

export default Contents