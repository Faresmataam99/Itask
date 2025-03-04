"use client";

import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const loginAction = useSelector((state) => state.user.loginAction);


  const submit = () => {
    try {
      const login = async () => {
        const response = await axios
          .post("http://localhost:8000/login")
          .then((response) => setUser(response.data));
          e.preventDefault()
        localStorage();
const router = Router()
        router.push("/")
        loginAction()
      };
    } catch (e) {
      console.error("login failed", e);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen bg-cover bg-[url('/abstract.jpg')]">
        <form
          onSubmit={submit}
          className="border p-6 w-96 rounded-lg flex-col gap-3 shadow-lg hover:shadow-indigo-700 bg-black transtion-all duration-200"
        >
          <div className="flex flex-col gap-2">
            <p className="text-lg text-white">Email adress</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email...."
              className="rounded-full hover:bg-gray-200 transition-all duration-200 p-3 text-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg text-white">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password...."
              className="rounded-full hover:bg-gray-200 transition-all duration-200 p-3 text-lg"
            />
          </div>
          <button className=" bg-indigo-700 shadow-lg m-10 text-white px-6 py-3  hover:bg-white hover:text-black font-semibold trnasition-all duration-200  "> Log in  </button>
        </form>
      </div>
    </>
  );
};
