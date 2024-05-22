"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Axios from "axios";
import Image from 'next/image'
import Logo from '../../../public/assets/logo.png';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const logoutUser = async () => {
    try {
      let res = await Axios.get("API/Users/signout");
      toast.success("Logout Successfull");
      router.push("/signin");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-gray-800 py-2 px-4 flex justify-between items-center fixed top-0 w-full">
      <div className="flex items-center">
        <Link href="/"><Image src={Logo} alt="not found" className="h-16 w-16 rounded-full"/></Link>
      </div>
      <div className="flex items-center">
        {pathname === "/profile" || pathname === "/products" || pathname === "/success" ? (
          <div className="ml-8">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {pathname !== "/signup" && (
              <div className="ml-8">
                <Link href="/signup">Sign Up</Link>
              </div>
            )}
            {pathname !== "/signin" && (
              <div className="ml-8">
                <Link href="/signin">Sign In</Link>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
