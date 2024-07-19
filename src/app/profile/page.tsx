"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import DietPlan from "@/components/dietPlan"
import WorkoutPlan from "@/components/workoutPlan"
import GenerateDietPlan from "@/components/dietPlanGeneratorUI";
// import GenerateWorkoutPlan from "@/components/workoutPlanGeneratorUI";

export default function ProfilePage() {
    const [data, setData] = useState("nothing");
    const { user } = useUser();  
    
    useEffect(() => {
        if (user) {
            setData(user._id)
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
            
            <DietPlan email={user?.email}/>
            {/* <WorkoutPlan email={user?.email}/> */}
            <GenerateDietPlan email={user?.email}/>
            {/* <GenerateWorkoutPlan email={user?.email}/> */}
        </div>
    )
}