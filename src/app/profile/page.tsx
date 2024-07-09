"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { run } from '@/helpers/promptWriter'

export default function ProfilePage() {
    const [data, setData] = useState("nothing");

    var aiResponse = "Hi I am Google AI";
    const getPrompt = async () => {
        aiResponse = await run();
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-4 rounded bg-green-400">{data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>Your Profile</Link>}</h2>
            <hr />
            <h2 className="p-4 rounded bg-green-400">{aiResponse}</h2>

            <button
                onClick={getPrompt}
                className="bg-amber-300 hover:bg-amber-500 text-white font-bold mt-4 py-2 px-4 rounded"
            >
                Get Prompts
            </button>
        </div>
    )
}