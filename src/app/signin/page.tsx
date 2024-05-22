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

  const SigninUser = async (body:any) => {
    try {
      setLoading(true);
      const res = await Axios.post("/API/Users/signin", body);
      console.log("Response: ", res);
      toast.success("Signin Successfull");
      router.push("/profile");
    } catch (err) {
      console.log(err);
      toast.error("Signin Failed");
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
      <h1 className="text-3xl font-bold text-white mb-4">{loading ? "Processing" : "Signin"}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={SigninUser}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
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
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                New User?{" "}
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
