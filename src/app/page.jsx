"use client";

import axios from "axios";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { loginAction, logoutAction } from "../lib/store/userSlice";
import { redirect } from "next/dist/server/api-utils";

export default () => {
  const user = useSelector((state) => state.user.user);
  const isConnected = useSelector((state) => state.user.isConnected);
  const tasksLength = useSelector((state) => state.task.tasks.length);
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [coloredPopUP, setColoredPopUp] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpened(true);
  };
  const closeModal = () => {
    setModalIsOpened(false);
  };

  const taskPopUp = () => {
    setColoredPopUp(true);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8000/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch(loginAction(response.data));
        });
    }
  }, [dispatch]);

  const loggingOut = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction(user));
  };

  useEffect(() => {
    try {
      const fetchTasks = async () => {
        const response = await axios
          .get("http://localhost:8000/tasks")
          .then((response) => setTasks(response.data));
      };
      fetchTasks();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const date = () => {
    date = new Date();
  };

  return (
    <>
      <div className="grid grid-cols-2  ">
        <SideBar />
        <div className="flex flex-col gap-2 ">
          <h1 className="font-semibold text-xl">
            Good morning {user.firstname}
            <span></span> {user.lastname}
          </h1>
          {isConnected ? (
            <button
              className="rounded-full bg-red-600 text-white px-4 py-2 w-fit"
              onClick={loggingOut}
            >
              Logout
            </button>
          ) : (
            <p className="text-lg font-bold">
              Your Daily schedule can be more organised if u sign
            </p>
          )}
          <h2 className="font-semibold"> Today </h2>
          <div className="flex flex-col  max-w-screen-lg gap-4 ">
            <ul className="flex max-w-screen-lg p-2 flex-col gap-4">
              {tasks.map((task, index) => {
                return (
                  <li
                    className="flex w-full items-center gap-3 justify-between border rounded-lg shadow-lg p-2 hover:shadow-xl transition-all duration-200 "
                    key={index}
                  >
                    <h1 className="text-lg font-semibold "> {task.title} </h1>
                    <h1 className="text-lg"> {task.issue} </h1>
                    <div className="rounded-full px-4 py-2 text-lg bg-yellow-100 text-orange-700 border-orange-700">
                      <span> {task.condition} </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* task creation panel */}
          <div
            onClick={openModal}
            className="flex cursor-pointer  items-center gap-3 bg-black text-white rounded-full text-lg font-semibold p-3 w-full hover:bg-gray-700 transition-all duration-200"
          >
            <span>+</span>
            <p>Create a New Task</p>
          </div>
          <Modal
            isOpen={modalIsOpened}
            onRequestClose={closeModal}
            className="fixed inset-0 z-20 rounded-lg flex items-center flex-col gap-4 "
          >
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transtion={{ opacity: 0.5 }}
            >
              <input type="text" className="rounded-lg border p-2 " />
              <span></span>
              <span></span>
            </motion.div>
          </Modal>
        </div>
      </div>
    </>
  );
};
