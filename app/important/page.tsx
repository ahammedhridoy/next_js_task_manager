"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import { FaEdit, FaHome } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { MdAddCircleOutline, MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
const Important = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateIsCompleted, setUpdateIsCompleted] = useState(false);
  const [updateIsImportant, setUpdateIsImportant] = useState(false);
  const [important, setImportant] = useState<any[]>([]);
  const { userId } = useAuth();
  console.log(userId);

  // single task
  const showValue = (id: any) => {
    const singleTask = important.find((task: any) => task.id === id);
    if (singleTask) {
      setUpdateTitle(singleTask.title);
      setUpdateDescription(singleTask.description);
      setUpdateDate(singleTask.date);
      setUpdateIsCompleted(singleTask.isCompleted);
      setUpdateIsImportant(singleTask.isImportant);
    }
  };

  // Create Task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
      title,
      description,
      date,
      isCompleted,
      isImportant,
      userId,
    };

    try {
      if (!title || !description || !date) {
        toast.error("All fields are required");
      }
      const { data } = await axios.post("/api/tasks", task);
      if (!data) {
        if (data?.status !== 200) {
          toast.error("Error On Creating Task");
        }
      }
      if (data) {
        toast.success("Task Created Successfully");
        setTitle("");
        setDescription("");
        setDate("");
        setIsCompleted(false);
        setIsImportant(false);
        getTask();
        (document.getElementById("my_modal_1") as any).close();
      }
    } catch (error) {
      toast.error("Error On Creating Task");
      console.log(error);
    }
  };

  // Get Task

  const getTask = async () => {
    try {
      const { data } = await axios.get("/api/tasks");
      const importantTask = data.filter(
        (task: any) => task.isImportant === true
      );
      const userTasks = importantTask.filter(
        (task: any) => task.userId === userId
      );
      if (JSON.stringify(userTasks) !== JSON.stringify(important)) {
        setImportant(userTasks);
      }
    } catch (error) {
      toast.error("Error On Get Task");
    }
  };
  useEffect(() => {
    getTask();
  }, []);

  // Update complete
  const handleUpdateComplete = async (id: any) => {
    try {
      const res = await axios.patch(`/api/tasks/${id}`, {
        isCompleted,
      });
      getTask();
      if (res) {
        toast.success("Task updated successfully:");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task");
    }
  };

  // Update task
  const handleUpdate = async (id: any) => {
    try {
      const res = await axios.put(`/api/tasks/${id}`, {
        title: updateTitle,
        description: updateDescription,
        date: updateDate,
        isCompleted: updateIsCompleted,
        isImportant: updateIsImportant,
      });
      if (res) {
        toast.success("Task updated successfully:");
        getTask();
        (document.getElementById("my_modal_2") as any).close();
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task");
    }
  };

  // Delete Task
  const deleteTask = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task Deleted Successfully");
      getTask();
    } catch (error) {
      toast.error("Error On Deleting Task");
      console.log(error);
    }
  };
  return (
    <div className="card w-100 bg-base-100 shadow-xl min-h-screen p-5">
      <ToastContainer />
      {/* Modal */}
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Create a Task</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full mb-3"
              value={title ? title : ""}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
            />
            <textarea
              className="textarea textarea-bordered w-full mb-3"
              rows={4}
              placeholder="Description"
              value={description ? description : ""}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
            ></textarea>
            <input
              className="input input-bordered w-full mb-3"
              type="date"
              name="date"
              id=""
              value={date ? date : ""}
              onChange={(e) => setDate(e.target.value)}
            />
            <div className="form-control mb-3">
              <label className="label cursor-pointer">
                <span className="label-text">Toggle Complete</span>
                <input
                  value={isCompleted?.toString()}
                  type="checkbox"
                  className="checkbox"
                  onChange={(e) => setIsCompleted(!isCompleted)}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Toggle Important</span>
                <input
                  value={isImportant?.toString()}
                  onChange={(e) => setIsImportant(!isImportant)}
                  type="checkbox"
                  className="checkbox"
                />
              </label>
            </div>
            <div className="mt-5">
              <button className="btn btn-primary" type="submit">
                Create Task
              </button>{" "}
            </div>
          </form>

          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* Modal */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl">Important Task</h1>
        <MdAddCircleOutline
          onClick={() =>
            (document.getElementById("my_modal_1") as any).showModal()
          }
          className="text-3xl cursor-pointer"
        />
      </div>

      {/* Task */}
      <div className="main-task grid mdl:grid-cols-2 grid-cols-1 gap-5 mt-5">
        {important?.map((task: any, index: any) => (
          <div className="card-wrapper" key={index}>
            <div className="card w-100 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{task?.title}</h2>
                <p>{task?.description}</p>
                <p className="mt-4">{task?.date}</p>
                <div className="flex justify-between mt-2">
                  <div className="">
                    {task?.isCompleted === true ? (
                      <button
                        className="btn btn-success text-white"
                        onClick={() => {
                          setIsCompleted(!isCompleted);
                          handleUpdateComplete(task?.id);
                        }}
                      >
                        Complete
                      </button>
                    ) : (
                      <button
                        className="btn btn-error text-white"
                        onClick={() => {
                          setIsCompleted(!isCompleted);
                          handleUpdateComplete(task?.id);
                        }}
                      >
                        Incomplete
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-primary text-white"
                      onClick={() => {
                        (
                          document.getElementById("my_modal_2") as any
                        ).showModal();
                        setTaskId(task?.id);
                        showValue(task?.id);
                      }}
                    >
                      <FaEdit className="text-2xl" />
                    </button>
                    <button
                      className="btn btn-error text-white"
                      onClick={() => deleteTask(task?.id)}
                    >
                      <MdDeleteForever className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Update modal */}
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Update Task</h3>

                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered w-full mb-3"
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  name=""
                  value={updateTitle}
                />
                <textarea
                  className="textarea textarea-bordered w-full mb-3"
                  rows={4}
                  placeholder="Description"
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  name=""
                  value={updateDescription}
                ></textarea>
                <input
                  className="input input-bordered w-full mb-3"
                  type="date"
                  name=""
                  id=""
                  onChange={(e) => setUpdateDate(e.target.value)}
                  value={updateDate}
                />
                <div className="form-control mb-3">
                  <label className="label cursor-pointer">
                    <span className="label-text">Toggle Complete</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={(e) => setUpdateIsCompleted(!updateIsCompleted)}
                      checked={updateIsCompleted === true}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Toggle Important</span>
                    <input
                      onChange={(e) => setUpdateIsImportant(!updateIsImportant)}
                      type="checkbox"
                      className="checkbox"
                      checked={updateIsImportant === true}
                    />
                  </label>
                </div>
                <div className="mt-5">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdate(taskId)}
                  >
                    Update Task
                  </button>{" "}
                </div>

                <div className="modal-action">
                  <form method="dialog" className="flex gap-4">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            {/* Update modal */}
          </div>
        ))}
      </div>
      {/* Mobile Menu */}
      <div className="realtive">
        <div className="mobile-menu flex flex-col gap-4 bg-[#18204b] p-4 shadow-sm fixed z-50  lg:hidden ">
          <Link href="/">
            <FaHome />
          </Link>
          <Link href="/important">
            <CiBoxList />
          </Link>
          <Link href="/completed">
            <IoCheckmark />
          </Link>
          <Link href="/doitnow">
            <IoIosDocument />
          </Link>
        </div>
      </div>
      {/* Mobile Menu */}
    </div>
  );
};

export default Important;
