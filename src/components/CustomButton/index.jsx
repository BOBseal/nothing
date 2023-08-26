
const CustomButton = ({ styles, title, handleClick }) => {
  return (
    <button 
      className={`px-[10px] py-[5px] rounded-[15px] items-center text-[16px] hover:opacity-[0.8] transition-all duration-500 ${styles}`}
      onClick={handleClick}
      >
        {title}
    </button>
  )
}

export default CustomButton