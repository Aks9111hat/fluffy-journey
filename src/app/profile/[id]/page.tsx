"use client";

import {  useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import UserDetailsInfo from "@/components/DisplayComponents/userDetailsInfo";

export default function UserProfile({ params }: any) {
    const router = useRouter();
    const { user } = useUser();
    useEffect(() => {
        if (user) {
            if (user._id !== params.id) {
                router.push(`/profile/${user._id}`);
            }
        }
    }, [user]);

    const toDetailsForms = () => {
        router.push('/profile/details');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-8">
            <h1 className="text-4xl font-bold">User Profile</h1>
            <hr className="w-full border-gray-300" />
            {user?.email ? (
                <UserDetailsInfo email={user?.email} />
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
