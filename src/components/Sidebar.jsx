"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../lib/store/userSlice";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import axios from "axios";
import { addTask } from "../lib/store/tasksSlice";
import { motion } from "framer-motion";
import Modal from "react-modal";

const dancingScript = Dancing_Script({ subsets: ["latin"] });
export default () => {
  const [tasks, setTasks] = useState([]);
  const [expandSearch, setExpandSearch] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [issue, setIssue] = useState("");
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const user = useSelector((state) => state.user.user);
  const isConnected = useSelector((state) => state.user.isConnected);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const [completed, setCompleted] = useState("");
  const [personal, setPersonal] = useState("");
  const [work, setWork] = useState("");
  const [selectedTasks, setSelectedTasks] = useState("all");
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const [tasksFilteredColors, setTasksFilteredColors] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/tasks", {
        title,
        issue,
        condition,
      });
      setTasks([...tasks, response.data]);
      closeModal();
    } catch (e) {
      console.error({ message: "error adding task" });
    }
  };

  const createGroup = (e) => {
    const input = e.target.value;
    setQuery(input);
  };

  const countingTasks = async () => {
    try {
      const response = await axios
        .get("http://localhost:8000")
        .then((response) => setTasks(response.data));
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8000/account", {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => dispatch(loginAction(response.data)));
    }
  }, [dispatch]);

  const filterTasks = (filter) => {
    setSelectedTasks(filter);
  };

  return (
    <>
      <div className="flex flex-col gap-10 p-2 sticky left-0 z-50 border">
        {isConnected ? (
          <div className="flex">
            <p className={`${dancingScript.className} text-4xl font-semibold`}>
              {user.firstName} Private tasks
            </p>
          </div>
        ) : (
          <div>
            <p className="font-semibold text-lg">
              Join Itaskly to manage your lifestyle and unleash ur productivity
            </p>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <p className="text-lg">🏠Home</p>
        </div>
        {/* the list */}
        {/* first task panel */}
        <div className="flex gap-2">
          <span
            className={`cursor-pointer p-3 border-2 rounded-lg border-green-300 hover:bg-green-300 transition-all duration-200`}
          ></span>
          <p className={`${dancingScript.className} font-bold text-lg`}>
            Completed
          </p>
          <span>{tasks.length}</span>
        </div>
        {/* first task panel */}

        {/* second tasks panel */}
        <div className="flex items-center gap-2">
          {" "}
          <span
            onClick={() => setTasksFilteredColors(!tasksFilteredColors)}
            className={`cursor-pointer rounded-lg p-3 border-2 border-orange-400 hover:bg-orange-400 transition-all duration-200 ${
              tasksFilteredColors
                ? "bg-orange-400 hover:bg-orange-800"
                : "bg-white"
            }`}
          ></span>{" "}
          <p className={`${dancingScript.className}font-bold text-lg`}>
            Personal
          </p>{" "}
          <span> {tasks.length} </span>{" "}
        </div>
        {/* second tasks panel */}

        {/* <div className="flex items-center gap-2">
          {filters.map((filter) => (
            <span
              onClick={(e) => setTasksFilteredColors(e.target.value)}
              className={`px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 cursor-pointer ${
                filter === selectedTasks
                  ? "bg-orange-500 border-orange-500 border-2 rounded-lg"
                  : "bg-white p-3 "
              }`}
              key={filter}
            >
              {" "}
              {filter}{" "}
            </span>
          ))}
          <p className="text-lg">Work</p>
          <span> {tasks.length} </span>
        </div> */}

        <div className="cursor-pointer flex items-center gap-2 hover:bg-gray-200 transition-all duration-200 p-3">
          <span className="text-xl"> 🚗 </span>
          <p className="text-lg">Roadtrip list</p>
          <span> {tasks.length} </span>
        </div>

        <div className="flex cursor-pointer items-center p-3 rounded-lg hover:bg-gray-200 transition-all duration-200 gap-2">
          <span className="text-xl"> 📚 </span>
          <p className="text-lg">Book list</p>
          <span> {tasks.length} </span>
        </div>

        <Link href={"/diet"}>
          <div className="flex cursor-pointer items-center rounded-lg p-3 hover:bg-gray-200 transition-all duration-200 gap-2">
            <span className="text-xl"> 🍎 </span>
            <p className="text-lg">Diet</p>
            <span>{tasks.length} </span>
          </div>
        </Link>
        {/* the list */}
        <div className="rounded-full bg-gray-200 p-2 text-lg w-80 gap-2 items-center flex">
          <button
            className="bg-indigo-600 text-xl hover:bg-indigo-400 text-white transition-all duration-200 rounded-full px-3 py-1.5"
            onClick={openModal}
          >
            +
          </button>
          <input
            type="text"
            className="bg-gray-200 rounded-full"
            placeholder="Create a new List"
            style={{
              width: expandSearch ? "500px" : "50px",
              transition: "width 0.3s ease",
            }}
            onFocus={() => setExpandSearch(true)}
            onBlur={() => setExpandSearch(false)}
          />

          <Link href={"/"}>
            <span className="text-xl bg-gray-200 border rounded-full px-4 py-2 hover:bg-gray-400 hover:text-white transition-all duration-200">
              ⌘
            </span>
          </Link>
          <Link href={"/"}>
            <span className="text-xl bg-gray-200 border rounded-full px-4 py-2 hover:bg-gray-400 hover:text-white transition-all duration-200">
              L
            </span>
          </Link>
        </div>
        {/* modal panel */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 z-80 flex items-center justify-center bg-opacity-50 bg-black"
        >
          {/* modal panel */}

          {/* motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white p-6 rounded-lg"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                value={title}
                type="text"
                className="rounded-lg p-2 bg-gray-200 w-96 hover:bg-gray-300 transition-all duration-200"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <input
                value={issue}
                type="text"
                className="rounded-lg p-2 bg-gray-200 w-96 hover:bg-gray-300 transition-all duration-200"
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Issue"
              />
              <input
                value={condition}
                type="text"
                className="rounded-lg p-2 w-96 bg-gray-200 hover:bg-gray-300 transition-all duration-200"
                onChange={(e) => setCondition(e.target.value)}
                placeholder="Condition"
              />
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="rounded-lg px-4 py-2 text-white bg-indigo-600 font-semibold"
                >
                  Add Task
                </button>
                <button
                  onClick={closeModal}
                  className="rounded-lg bg-gray-100 text-gray-500 px-4 py-2 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </Modal>

        {/* motion */}

        {/* group panel */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg hover:-translate-y-3 hover:bg-black hover:text-white  hover:shadow-indigo-700 transition-all duration-200 hover:shadow-lg">
            <img
              src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202106/ezgif.com-gif-maker_4__1200x768.jpeg?size=690:388"
              height={100}
              width={100}
              className="rounded-lg w-full object-cover"
            />
            <p className="text-lg font-semibold mt-3">
              Share through platforms
            </p>
          </div>
          {isConnected ? (
            <div className="flex rounded-lg ">
              <img src="organizing.jpg" alt="current news" />
              <p>soon</p>
            </div>
          ) : (
            <Link href={"/login"}>
              <div className="rounded-lg hover:shadow-indigo-700 hover:bg-black hover:text-white  hover:-translate-y-4 transition-all duration-200 hover:shadow-lg">
                <img
                  src="https://i.ytimg.com/vi/-p47G3t1bpc/maxresdefault.jpg"
                  alt=""
                  height={100}
                  width={100}
                  className="rounded-lg w-full object-cover"
                />
                <p className="text-lg font-semibold mt-3">
                  Stay tuned to any updates
                </p>
              </div>
            </Link>
          )}
          <div className="flex items-center text-lg bg-gray-200 rounded-full gap-3">
            <input
              type="text"
              className="rounded-full hover:bg-gray-300 p-3 bg-gray-200 transition-all duration-200"
              placeholder="Create a new group"
            />
            <span className=" rounded-full px-3 py-1.5 border-1"> ⌘ </span>
          </div>
        </div>
      </div>
    </>
  );
};
