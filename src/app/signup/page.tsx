"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verifyEmailSent, setVerifyEmailSent] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            if (response.data.success) {
                console.log("signup success", response)
                toast.success("Signup success! Please verify your email to continue.")
                setVerifyEmailSent(true)
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error: any) {
            console.log("catch block of onSignup", error.message);
            toast.error("Signup Failed")
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {
                !verifyEmailSent && <div className="flex flex-col items-center justify-center min-h-screen py-2">
                    <h1>{loading ? "Processing" : "Signup"}</h1>
                    <hr />
                    <label htmlFor="username">username</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        type="text"
                        id="username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="username"
                    />
                    <label htmlFor="email">email</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        type="text"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                    <label htmlFor="password">password</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                    <button
                        onClick={onSignup}
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    >{buttonDisabled ? "No signup" : "Signup"}</button>
                    <p>Already have a account? <Link href="/login" className="text-blue-600">Login here</Link></p>
                </div>
            }
            {
                verifyEmailSent && <div>
                    <h1>Check your email to verify your account</h1>
                </div>
            }

        </div>
    )

}