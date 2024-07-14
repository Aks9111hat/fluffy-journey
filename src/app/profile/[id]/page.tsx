"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import UserDetailsInfo from "@/components/userDetailsInfo";

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
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            if (user._id !== params.id) {
                router.push(`/profile/${user._id}`);
            }
            setReqBody({ email: user.email });
        }
    }, [user]);

    useEffect(() => {
        if (reqBody.email) {
            getUserDetails();
        }
    }, [reqBody]);

    const toDetailsForms = () => {
        router.push('/profile/details');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-8">
            <h1 className="text-4xl font-bold">User Profile</h1>
            <hr className="w-full border-gray-300" />
            {userDetails ? (
                <UserDetailsInfo userDetails={userDetails} />
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
    );
}
