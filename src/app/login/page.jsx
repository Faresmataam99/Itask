"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../lib/store/userSlice";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const isConnected = useSelector((state) => state.user.isConnected);

  // Optional: bounce if already logged in
  useEffect(() => {
    if (isConnected) router.push("/");
  }, [isConnected, router]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      // Expecting { token, user } from the API
      const { token, user } = response.data || {};

      if (token) localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));

      // If your reducer expects just the user, use: dispatch(loginAction(user));
      dispatch(loginAction({ token, user }));

      router.push("/");
    } catch (err) {
      console.error("login failed", err);
      // TODO: show an error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-cover bg-[url('/organizing.jpg')]">
      <form
        onSubmit={submit}
        className="border flex p-6 w-96 rounded-lg flex-col gap-9 shadow-lg hover:shadow-white bg-white transition-all duration-200"
      >
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Email</p>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email...."
            className="rounded-full hover:bg-gray-200 transition-all duration-200 p-3 text-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Password</p>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password...."
            className="rounded-full hover:bg-gray-200 transition-all duration-200 p-3 text-lg"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-fit bg-indigo-700 rounded-full shadow-lg text-white px-6 py-3 hover:bg-black hover:text-white font-semibold transition-all duration-200"
        >
          Log in
        </button>

        <div className="flex items-center justify-between w-full gap-3 p-3">
          <span>
            <img
              src="login.png"
              alt="login"
              className="w-10 h-10 hover:shadow-xl hover:shadow-[-#db3a3c] transition-all duration-200"
            />
          </span>
          <p>
            Don't have an account?{" "}
            <Link href="/register">
              <span className="hover:underline font-bold transition-all duration-200">
                create a new one
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

// "use client";

// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

// export default () => {
//   const [user, setUser] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const dispatch = useDispatch();
//   const isConnected = useSelector((state) => state.user.isConnected);
//   const router = useRouter();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios
//         .post("http://localhost:8000/login", {
//           email,
//           password,
//         })
//         .then((response) => setUser(response.data));
//       localStorage.setItem("token", response.data.token);
//       const router = router();
//       dispatch(loginAction({ token, user }));
//       router.push("/");
//     } catch (e) {
//       console.error("login failed", e);
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-center w-screen h-screen bg-cover bg-[url('/organizing.jpg')]">
//         <form
//           onSubmit={submit}
//           className="border flex p-6 w-96 rounded-lg flex-col gap-9 shadow-lg hover:shadow-white bg-white transition-all duration-200"
//         >
//           <div className="flex flex-col gap-2">
//             <p className="text-lg font-semibold">Email</p>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="email...."
//               className="rounded-full hover:bg-gray-200 transition-all duration-200 p-3 text-lg "
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <p className="text-lg font-semibold ">Password</p>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="password...."
//               className="rounded-full hover:bg-gray-200 transition-all duration-200 p-3 text-lg"
//             />
//           </div>
//           <button className=" mt-4 w-fit bg-indigo-700 rounded-full shadow-lg  text-white px-6 py-3  hover:bg-black hover:text-white font-semibold trnasition-all duration-200  ">
//             {" "}
//             Log in{" "}
//           </button>
//           <div className="flex items-center justify-between w-full gap-3 p-3">
//             <span>
//               <img
//                 src="login.png"
//                 className="w-10 h-10 hover:shadow-xl hover:shadow-[-#db3a3c] transition-all duration-200"
//               />
//             </span>
//             <p>
//               Don't have an account ?{" "}
//               <Link href={"/register"}>
//                 <span className="hover:underline font-bold transition-all duration-200">
//                   create a new one
//                 </span>
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };
