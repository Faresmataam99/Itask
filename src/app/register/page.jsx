import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default () => {
    const [users,setUsers]=useState('')
    const [firstname,setFirstName]=useState('')
    const [lastname,setLastName]=usestate('')
    const [country,setCountry]=useState('')
    const [age,setAge ]=useState('')
    const[email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfimrPassword]=useState('')

    const submit = async (e)=>{
            const response = await axios.post("http://localhost:8000/register")
            .then((resposne)=>setUsers(response.data))
    }

  return (
    <>
      <div className="flex itmes-center w-screen h-screen justify-center items-center">
        <div>
          <form onSubmit={submit} className="flex flex-col gap-6 p-6 ">
            <input onChange={(e)=>setFirstName(e.target.value)} value={firstname} className="p-2 rounded-full hover:bg-gray-200 hover:shadow-xl transition-all duraiton-200 text-lg" type="text" />
            <input onChange={(e)=>setLastName(e.target.value)} value={lastname} className="p-2 rounded-full hover:bg-gray-200 hover:shadow-xl transition-all duraiton-200 text-lg" type="text" />
            <input onChange={(e)=>setAge(e.target.value)} value={age} className="p-2 rounded-full hover:bg-gray-200 hover:shadow-xl transition-all duraiton-200 text-lg" type="text" />
            <input onChange={(e)=>setCountry(e.target.value)} value={country} className="p-2 rounded-full hover:bg-gray-200 hover:shadow-xl transition-all duraiton-200 text-lg" type="text" />
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className="p-2 rounded-full hover:bg-gray-200 hover:shadow-xl transition-all duraiton-200 text-lg" type="text" />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className="p-2 rounded-full hover:bg-gray-200 hover:shadow-xl transition-all duraiton-200 text-lg" type="text" />
          </form>
        </div>
      </div>
    </>
  );
};
