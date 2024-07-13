"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";



export default function UserProfile({ params }: any) {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<any>(null);
    const [reqBody, setReqBody] = useState({
        email: ""
    });
    const { user } = useUser();


    const getUserDetails = async () => {
        try {
            const response = await axios.post('/api/users/getUserDetails', reqBody);
            setUserDetails(response.data.userDetails);
            toast.success(response.data.message)
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            if (user._id !== params.id) {
                router.push(`/profile/${user._id}`)
            }
            setReqBody({ email: user.email })
        }
    }, [user])
    useEffect(() => {
        if (reqBody.email) {
            getUserDetails()
        }
    }, [reqBody])

    const toDetailsForms = () => {
        router.push('/profile/details');
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-8">
            <h1 className="text-4xl font-bold">User Profile</h1>
            <hr className="w-full border-gray-300" />
            {/* <p className="text-4xl">User ID:
                <span className="p-2 ml-2 rounded bg-emerald-300 text-black ">{params.id}</span>
            </p> */}
            {userDetails ? (
                <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
                    <img src={userDetails.profilePicture || userDetails.gender == 'female' ? '/images/profileWoman.png' : '/images/profileMan.png'} alt="Profile Picture" className="w-32 h-32 rounded-full object-cover" />
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Date of Birth:</strong> {userDetails.dateOfBirth ? new Date(userDetails.dateOfBirth).toISOString().split('T')[0] : ""}</p>
                    <p><strong>Gender:</strong> {userDetails.gender}</p>
                    <p><strong>Height:</strong> {userDetails.height}</p>
                    <p><strong>Weight:</strong> {userDetails.weight}</p>
                    <p><strong>BMI:</strong> {Math.round(userDetails.bmi*100)/100}</p>
                    <p><strong>Country:</strong> {userDetails.country}</p>
                    <p><strong>Number of Meals:</strong> {userDetails.noOfMeals}</p>
                    <p><strong>Health Goal:</strong> {userDetails.userHealthGoal}</p>
                    <p><strong>Diet Preference:</strong> {userDetails.dietTypePreference}</p>
                    <p><strong>Exercise Frequency:</strong> {userDetails.exerciseFrequency}</p>
                    <p><strong>Medical History:</strong> {userDetails.medicalHistory}</p>
                </div>
            ) : (
                <p className="text-lg text-gray-600">Please update your details to view your profile information.</p>
            )}
            <button
                onClick={toDetailsForms}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
            >
                Update Your Details
            </button>
        </div>
    )
}