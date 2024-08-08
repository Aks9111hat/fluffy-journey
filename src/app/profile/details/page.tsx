// pages/details.tsx

"use client";
import UserDetailsForm from "@/components/FunctionalComponents/userDetailsForm";

export default function UserDetails() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">User Details</h1>
            <div className="w-full max-w-lg p-8 bg-white rounded-md shadow-md">
                <UserDetailsForm />
            </div>
        </div>
    );
}
