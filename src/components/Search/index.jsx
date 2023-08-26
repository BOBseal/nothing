import { BiSearch } from "react-icons/bi"

const Search = ({ styles }) => {
  return (
    <section className={`flex flex-row items-center gap-[5px] ${styles} rounded-[15px] border-[4px] border-main search-box_gradient`}>
        <input 
            type="text" 
            placeholder='Search KeyWords ...'
            className='border-none outline-none h-full w-[85%] rounded-[15px] bg-transparent px-[10px] py-[5px] placeholder:text-secondary ' 
            />
          <div className='h-[20px] w-[2px] bg-main' />
         <BiSearch className='text-main md:text-[22px] text-[18px]' />
    </section>
  )
}

export default Search