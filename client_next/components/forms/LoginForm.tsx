"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn, setIsLoggedIn, refreshAuth } = useAppContext();

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

    useEffect(() => {
        if (isLoggedIn) {
            router.replace("/main");
        }
    }, [isLoggedIn]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(BACKEND_URL + '/api/auth/login', { username, password }, { withCredentials: true })
            if (data.success) {
                toast.success("Logged in successfully!");
                await refreshAuth();
                return;
            } else {
                toast.warn(data.message)
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="border border-black/10 dark:border-white/10 backdrop-blur-3xl rounded-lg px-10 py-5 w-80 md:w-90">
            <p className="font-semibold text-[1rem] md:text-[1.2rem] text-white">Welcome back!</p>
            <p className="mt-2 mb-5 text-[0.9rem] md:text-[1.1rem] text-gray-300">Log in to get right back in!</p>
            <button className="border bg-white dark:text-black w-full rounded-md h-10 flex items-center justify-center gap-2 my-3 cursor-pointer" onClick={() => { window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`; }}>
                <img src="/Google.png" alt="" className="h-5" />
                Continue with Google
            </button>
            <div className="relative flex items-center justify-center mt-5">
                <div className="absolute w-full h-px bg-white/20"></div>
                <span className="relative px-3 text-md text-white/70 backdrop-blur-3xl">
                    
                </span>
            </div>
            <p className="font-semibold text-white">Username</p>
            <input type="text" placeholder="demousername09" className="outline-none h-10 bg-white/30 dark:border-white/10 w-full rounded-md p-3 my-3"
                onChange={(e) => setUsername(e.target.value)} />
            <p className="font-semibold text-white">Password</p>
            <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="outline-none h-10 bg-white/30 dark:border-white/10 w-full rounded-md p-3 my-3 pr-10"
                    onChange={(e) => setPassword(e.target.value)} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black/50" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-[0.9rem] text-white">Forgot your password?</p>
                <span className="text-blue-800 underline cursor-pointer">Click here</span>
            </div>
            <Button disabled={loading} className={`w-full mt-5 cursor-pointer dark:text-white ${loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"}`} onClick={handleLogin}>
                {loading ? "Logging in" : "Log in"}
            </Button>
            <div className="flex items-center justify-between mt-3">
                <p className="text-[0.9rem] mt-3 text-white">Don't have an account?</p>
                <span className=" font-semibold underline cursor-pointer mt-1 text-white" onClick={() => router.push('/auth/register')}>Register</span>
            </div>
        </div>
    );
}
