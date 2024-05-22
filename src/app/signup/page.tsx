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

  const SignupUser = async (body:any) => {
    try {
      setLoading(true);

      const res = await Axios.post("/API/Users/signup", body);
      toast.success("User Signup Successfully");
      router.push("/signin");
    } catch (err) {
      console.log(err);
      toast.error("User Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  const imageStyling = {
    backgroundImage: `url('/assets/backgroundImage.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-400 min-h-screen" style={imageStyling}>
      <h1 className="text-3xl font-bold text-white mb-4">{loading ? "Processing" : "Signup"}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={SignupUser}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username && touched.username ? "border-red-500" : ""}`}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && touched.email ? "border-red-500" : ""}`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password && touched.password ? "border-red-500" : ""}`}
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
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
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
