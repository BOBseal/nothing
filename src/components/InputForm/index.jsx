"use client"
import { useState, useEffect } from 'react'
import { useBadgerContext } from '@/Context'

const InputForm = ({walletUser}) => {
        const { form ,setForm,addUser, updateUser, getUser, userInfo, user } = useBadgerContext()
        
        const { name, wallet, email, image } = form;
        const [walletState , useSetWalletState] = useState('')


        const handleChange = (e) => {
            const name = e.target.name
            const value = e.target.value;
            setForm({ ...form, [name]: value })
            console.log(value)
        }


        useEffect(() => {
            useSetWalletState(walletUser)
           const getSingleUser = async() => {
              // PASS USER WALLET HERE 
              if (user){
               await getUser(walletUser)
               console.log(walletUser)
              }
              }

           getSingleUser()
        }, [walletState])


  return (
    
        <form 
            encType='multipart/form-data' 
            className={`min-h-[350px] md:w-[50%] w-[75%] mx-auto rounded-[10px] p-[20px] ${userInfo._id&& "hidden"}`}
            
            >
             <div className='h-full w-full flex flex-col gap-[30px]'>
                <input 
                    type='file' 
                    placeholder='image' 
                    name="image"
                    accept='image/*' 
                    onChange={e => setForm({ ...form, image: e.target.files[0] })} 
                    className='px-[10px] text-red-500 py-[5px] rounded-[20px] '
                />
                <input type="text" placeholder='username' 
                  value={name}
                  name="name" 
                  onChange={e => handleChange(e)}
                  className='px-[10px] py-[5px] rounded-[10px] focus:outline-none' />


                <input type="email" 
                  placeholder='enter email' 
                  value={email}
                  name="email" 
                  onChange={e => handleChange(e)}
                  className='px-[10px] py-[5px] rounded-[10px] focus:outline-none' />

                <div className='flex flex-row gap-[15px] items-center'>
                  <button 
                    className='border-none w-[fit-content] px-[10px] py-[5px] opacity-[0.9] outline-none text-[18px] font-semibold bg-[#000] text-[#fff] rounded-[10px]'
                    onClick={async() => {
                      await addUser({ name, email, image, walletUser })
                    }}
                    > Save 
                  </button>
                  <button 
                    className='border-none w-[fit-content] px-[10px] py-[5px] opacity-[0.9] outline-none text-[18px] font-semibold bg-[#000] text-[#fff] rounded-[10px]'
                    onClick={async() => await updateUser({ name, email, image, walletUser }, userInfo._id)}
                    > Update </button>
                </div>
             </div>
        </form>

  )
}

export default InputForm