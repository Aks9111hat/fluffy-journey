"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useUser } from '@/contexts/userContext';

export default function UserDetails() {
    const { user } = useUser();
    const [userDetails, setUserDetails] = useState({
        email: "",
        dateOfBirth: new Date(),
        gender: "male",
        height: 175,
        weight: 805,
        country: "india",
        noOfMeals: 3,
        userHealthGoal: "Gain Muscle",
        dietTypePreference: "vegetarian",
        exerciseFrequency: 6,
        medicalHistory: "",
    });

    useEffect(() => {
        if (user) {
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                email: user.email,
            }));
        }
    }, [user]);

    console.log(userDetails);

    const saveUserDetails = async () => {
        try {
            const response = await axios.post('/api/users/userdetails', userDetails);
            if (response.data.success) {
                toast.success("Details saved successfully!");
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-8">
            <h1>UserDetails</h1>
            <hr />
            <p className="text-4xl">
                UserDetails:
                <span className="p-2 ml-2 rounded bg-emerald-300 text-black">Details</span>
            </p>
            <button
                onClick={saveUserDetails}
                className="p-3 bg-sky-600 hover:bg-blue-500"
            >
                Save Details
            </button>
        </div>
    );
}
