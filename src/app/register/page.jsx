"use client";

import axios from "axios";
import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default () => {
  const [users, setUsers] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfitrmPassword] = useState("");
  const [exisitingEmail, setExistingEmail] = useState(false);

  const router = useRouter();
  const [shadow, setShadow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (confirmPassword !== password) {
        alert("inidentical match my lady 🐼(avoid bignets)");
      }

      const response = await axios.post("http://localhost:8000/register", {
        firstname,
        lastname,
        age,
        email,
        password,
        confirmPassword,
      });
      setExistingEmail(false);

      router.push("/");
    } catch (err) {
      if (err.response?.status === 409) {
        setExistingEmail(true);
        console.error(e);
      }
    }
  };

  return (
    <>
      <motion.div className="flex itmes-center w-screen h-screen justify-center items-center">
        <div className="flex flex-col gap-4 w-96 s">
          <form
            onSubmit={submit}
            className="flex bg-gray-300 flex-col gap-6 p-6 rounded-lg "
          >
            {/* first info */}
            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold">First name</p>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
                className="p-2 rounded-full hover:bg-gray-200 hover:shadow-xl transition-all duraiton-200 text-lg"
                type="text"
              />
            </div>
            {/* second info */}
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-lg">Last name</p>
              <input
                onClick={() => onclick(setShadow(true))}
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
                className="p-2 rounded-full hover:bg-gray-200 hover:shadow-xl transition-all duraiton-200 text-lg"
                type="text"
              />
            </div>
            {/* third info  */}
            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold">Age</p>
              <input
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setAge(value < 16 ? 16 : value);
                }}
                value={age}
                className="p-2 rounded-full hover:bg-gray-200 hover:shadow-xl transition-all duraiton-200 text-lg"
                type="number"
                min="16"
              />
            </div>
            {/* fifth info */}
            <div className="flex flex-col gap-3 ">
              <p className="font-semibold text-lg">Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="p-2 rounded-full hover:bg-gray-200 hover:shadow-xl transition-all duraiton-200 text-lg"
                type="email"
              />
            </div>
            {exisitingEmail && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-red-500 font-light text-md">
                  An already possesed email
                </p>
              </motion.div>
            )}
            {/* sixth info */}
            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold">Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="p-2 rounded-full shadow-lg hover:bg-gray-200 hover:shadow-xl transition-all duraiton-200 text-lg"
                type="password"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold">Confirm password</p>
              <input
                className="rounded-full p-2 shadow-lg hover:bg-gray-200 hover:shadow-xl transition-all duration-200 text-lg"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfitrmPassword(e.target.value)}
              />
            </div>
            <button className="bg-indigo-700 px-4 py-2  hover:shadow-indigo-700 hover:shadow-y hover:bg-indigo-950 transition-all diuration-200 rounded-lg w-fit text-white font-semibold text-lg">
              Start your journey
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
};
