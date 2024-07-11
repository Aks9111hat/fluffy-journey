"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const [data, setData] = useState("nothing");
    const [aiResponse, setAiResponse] = useState("Hi I am Google AI");
    const [userPrompt, setUserPrompt] = useState({
        userprompt: "",
    });
    const getPrompt = async () => {
        console.log(userPrompt)
        if (userPrompt.userprompt != "") {
            console.log(userPrompt)
            setAiResponse("Loading...");
            try {
                const response = await axios.post('/api/genai/promptWriter', userPrompt);
                setAiResponse(response.data.prompt);
            } catch (error) {
                console.log(error);
                setAiResponse("Error loading prompt");
            }
        } else {
            setAiResponse("No Prompt Provided");
            toast.error("You Did not ask ai")
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        setData(res.data.data._id);
    }

    useEffect(() => {
        getUserDetails();
        // getPrompt();
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
            <label htmlFor="Ask AI">Ask AI</label>
            <input
                className="p-2 w-3/4  border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="text"
                id="AskAI"
                value={userPrompt.userprompt}
                onChange={(e) => setUserPrompt({ userprompt: e.target.value})}
            placeholder="Ask AI"
            />
            <button
                onClick={getPrompt}
                className="bg-amber-300 hover:bg-amber-500 text-white font-bold mt-4 py-2 px-4 rounded"
            >
                Get Prompts
            </button>
        </div>
    )
}