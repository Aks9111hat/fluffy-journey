"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import GenerateDietPlan from "@/components/FunctionalComponents/dietPlanGeneratorUI";

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
            <GenerateDietPlan email={user?.email} />
        </div>
    )
}