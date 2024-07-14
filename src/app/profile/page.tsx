"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/contexts/userContext";
import DietPlan from "@/components/dietPlan"
import WorkoutPlan from "@/components/workoutPlan"

export default function ProfilePage() {
    const [data, setData] = useState("nothing");
    const [aiResponse, setAiResponse] = useState("Hi I am Google AI");
    const [userPrompt, setUserPrompt] = useState({
        email: "",
        userprompt: "",
    });
    const { user } = useUser();
    
    //dead code:
    const getPrompt = async () => {
        console.log(userPrompt)
        console.log(userPrompt)
        setAiResponse("Loading...");
        try {
            const response = await axios.post('/api/genai/dietPlanGenerator', userPrompt);
            setAiResponse(response.data.prompt);
            toast.success(response.data.message)
        } catch (error) {
            console.log(error);
            setAiResponse("Error loading prompt");
        }
    }

    useEffect(() => {
        if (user) {
            setData(user._id)
            setUserPrompt({ ...userPrompt, email: user.email })
        }
    }, [user])

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-4 rounded bg-green-400">{data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>Your Profile</Link>}</h2>
            <hr />
            {/* Dead Code */}
            <h2 className="p-4 rounded bg-green-400">{aiResponse}</h2>
            <label htmlFor="Ask AI">Ask AI</label>
            <input
                className="p-2 w-3/4  border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="text"
                id="AskAI"
                value={userPrompt.userprompt}
                onChange={(e) => setUserPrompt({ ...userPrompt, userprompt: e.target.value })}
                placeholder="Ask AI"
            />
            <button
                onClick={getPrompt}
                className="bg-amber-300 hover:bg-amber-500 text-white font-bold mt-4 py-2 px-4 rounded"
            >
                Get Prompts
            </button>
            {/* <DietPlan email={user?.email}/>
            <WorkoutPlan email={user?.email}/> */}
        </div>
    )
}