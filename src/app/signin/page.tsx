"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const Schema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email Id is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const SigninUser = async (body: any) => {
    try {
      setLoading(true);
      const res = await Axios.post("/API/Users/signin", body);
      console.log("Response: ", res);
      toast.success("Signin Successfull");
      router.push("/profile");
    } catch (err: any) {
      console.log(err);
      toast.error("Signin Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-400 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-4">
        {loading ? "Processing" : "Signin"}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={SigninUser}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <Field
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <Field
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Signin
              </button>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                <span className="mr-2">New User?</span>
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
