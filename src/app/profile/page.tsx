"use client";
import Axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

interface UserData {
  username: string;
  email: string;
  id: string;
}

export default function Profile() {
  const [data, setData] = useState<UserData | null>(null);
  const [hideButton, setHideButton] = useState(false);

  // Edit

  const [editing, setEditing] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  // Logout User

  const logoutUser = async () => {
    try {
      let res = await Axios.get("API/Users/signout");
      toast.success("Logout Successfull");
      router.push("/signin");
    } catch (err: any) {
      console.log(err);
    }
  };

  // Get User Data

  const getUserData = async () => {
    try {
      setHideButton(true);
      let response = await Axios.get("API/Users/getuserdata");
      setData({
        username: response.data.data.username,
        email: response.data.data.email,
        id: response.data.data._id,
      });
      console.log("response", response.data.data);
    } catch (err: any) {
      console.log("err", err);
    }
  };

  // Update User

  const handleEdit = () => {
    setEditing(true);
    setUserName(data?.username || "");
    setEmail(data?.email || "");
  };

  const updateUser = async () => {
    try {
      setEditing(true);
      if (username === "" || email === "") {
        toast.error("Please fill all the fields");
      } else {
        const response = await Axios.put("API/Users/updateuserdata", {
          id: data?.id,
          username: username,
          email: email,
        });
        console.log(response, "response");
        toast.success("User updated successfully");
        setEditing(false);

        getUserData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile Page</h2>
      {data && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-4 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              User Details
            </h3>
            <FaEdit
              className="text-gray-600 cursor-pointer"
              onClick={handleEdit}
            />
          </div>
          <div className="mb-2">
            <p className="text-gray-600">Username:</p>
            {editing ? (
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-gray-200 rounded p-2 text-gray-600"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            ) : (
              <p className="text-gray-800 text-lg font-semibold">
                {data.username}
              </p>
            )}
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Email:</p>
            {editing ? (
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-200 rounded p-2 text-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p className="text-gray-800 text-lg font-semibold">
                {data.email}
              </p>
            )}
          </div>
          {editing && (
            <button
              onClick={updateUser}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Update
            </button>
          )}
        </div>
      )}
      <div className="mt-6">
        {!hideButton && (
          <button
            onClick={getUserData}
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Get User Data
          </button>
        )}
        <button
          onClick={logoutUser}
          className="bg-red-300 hover:bg-red-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
      <div className="mt-6">
        <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
          <Link href="/products">Show Products</Link>
        </button>
      </div>
    </div>
  );
}
