"use client";
import Axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {toast} from 'react-toastify'
import Link from 'next/link';

export default function Profile() {
  const [data, setData] = useState("");
  const [hideButton, setHideButton] = useState(false);

  const router = useRouter();
  const logoutUser = async () => {
    try {
      let res = await Axios.get("API/Users/signout");
      console.log(res, "Response");
      toast.success("Logout Successfull")
      router.push("/signin");
    } catch (err: any) {
      console.log(err);
    }
  };

  const getUserData = async () => {
    try {
      setHideButton(true);
      let response = await Axios.get("API/Users/getuserdata");
      setData(response.data.data.username);
    } catch (err: any) {
      console.log("err", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-400 min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-4">Profile Page</h2>
      {data && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
          <p className="text-center text-3xl text-gray-800">Welcome {data}</p>
        </div>
      )}
      <hr className="my-4" />

      {!hideButton && (
        <button
          onClick={getUserData}
          className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get User Data
        </button>
      )}
      <hr className="my-4" />
      <button
        onClick={logoutUser}
        className="bg-red-300 hover:bg-red-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>

      <button className="bg-purple-500 p-2 mt-4">
        <Link href="/products">Show Products</Link>
        </button>
    </div>
  );
}
