"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "@/lib/store/userSlice";
import Link from "next/link";

export default () => {
  const [tasks, setTasks] = useState([]);
  const user = useSelector((state)=>state.user)

  const dispatch = useDispatch();

  const fetchTasks = async (e) => {
    e.prevenetDefault();
    try {
      const response = await axios
        .get("http://localhost:8000/tasks")
        .then((response) => setTasks(response.data));
    } catch (e) {
      console.error({ message: "error finding tasks" });
    }
    fetchTasks();
  };

  const addToWork = ()=>{

  }


  return (
    <>
      <div className="flex flex-col gap-10 max-w-screen-sm p-2 sticky left-0 z-50 border">
        <div className="flex">
          <p className="text-3xl font-semibold"> {user.firstname}'s Private tasks </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg"> 🏠 Home</p>
        </div>
        {/* the list */}
        <div className="flex items-center gap-2 ">
          <span
            type="radius"
            className="rounded-lg p-3 border-2 border-green-300"
          ></span>
          <p className="text-lg">Completed</p>
        </div>

        <div className="flex items-center  gap-2">
          <span
            type="radius"
            className="rounded-lg p-3 border-2 border-red-500"
          ></span>
          <p className="text-lg">Personal</p>
        </div>

        <div className="flex items-center gap-2 ">
          <span className="rounded-lg p-3 border-2 border-orange-500"></span>
          <p className="text-lg">Work</p>
        </div>

        <div className="flex items-center gap-2 hover:bg-gray-200 transtion-all duration-200 p-3">
          <span className="text-xl"> 🚗 </span>
          <p className="text-lg">Roadtrip list</p>
        </div>

        <div className="flex items-center p-3 rounded-lg hover:bg-gray-200 transition-all duration-200 gap-2 ">
          <span className="text-xl"> 📚 </span>
          <p className="text-lg">Book list</p>
        </div>

        <div className="flex items-center rounded-lg p-3  hover:bg-gray-200 transition-all duration-200 gap-2 ">
          <span className="text-xl"> 🍎 </span>
          <p className="text-lg">Diet</p>
        </div>
        {/* the list */}
        <div className="rounded-full bg-gray-200 p-2 text-lg w-80 gap-2 items-center flex ">
          <span className="text-xl" >+</span>
          <input type="text" className="bg-gray-200 rounded-full" placeholder="Create a new task" />
         <Link href={"/"}> <span className="text-xl bg-gray-200 border rounded-full px-4 py-2 hover:bg-gray-400 hover:text-white transition-all duration-200">⌘</span></Link>
         <Link href={"/"}> <span className="text-xl bg-gray-200 border rounded-full px-4 py-2 hover:bg-gray-400 hover:text-white transition-all duration-200">L</span></Link>
        </div>

        {/* group panel */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg hover:-translate-y-3  hover:bg-black hover:text-white transtion-all hover:shadow-indigo-700 transition-all duration-200 hover:shadow-lg ">
          <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202106/ezgif.com-gif-maker_4__1200x768.jpeg?size=690:388" height={250} width={250} className="rounded-lg w-full object-cover" />
          <p className="text-lg font-semibold mt-3"> Share through plateforms </p>
          </div>

          <div className="rounded-lg hover:shadow-indigo-700  hover:bg-black hover:text-white transtion-all  hover:-translate-y-4 transtion-all duration-200 hover:shadow-lg">
<img src="https://i.ytimg.com/vi/-p47G3t1bpc/maxresdefault.jpg" alt="" height={250} width={250} className="rounded-lg w-full object-cover" />
<p className="text-lg font-semibold mt-3">Stay tuned to any updates</p>
          </div>

          <div>

          </div>
        </div>
      </div>
    </>
  );
};
