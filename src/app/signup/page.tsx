"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const Schema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().matches(emailRegex, "Invalid email format").required(),
    password: Yup.string().required(),
  });

  const SignupUser = async (body: any) => {
    try {
      setLoading(true);

      const res = await Axios.post("/API/Users/signup", body);
      toast.success("User Signup Successfully");
      router.push("/signin");
    } catch (err: any) {
      console.log(err);
      toast.error("User Signup Successfully");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-400 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-4">
        {loading ? "Processing" : "Signup"}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={SignupUser}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <Field
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

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
                Signup
              </button>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                <span className="mr-2">Already have an account?</span>
                <Link href="/signin" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
