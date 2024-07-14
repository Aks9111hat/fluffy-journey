// pages/api/users/userdetails.ts

import { connect } from "@/dbConfig/dbConfig";
import UserDetails from "@/models/userDetailsModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            email,
            dateOfBirth,
            gender,
            height,
            weight,
            country,
            noOfMeals,
            userHealthGoal,
            dietTypePreference,
            exerciseFrequency,
            medicalHistory,
            profilePicture,
            fitnessLevel,
            preferredWorkoutType,
            timeAvailability,
            equipmentAvailable,
        } = reqBody;

        const user = await UserDetails.findOne({ email });

        const bmi = weight / ((height / 100) ** 2);

        if (user) {
            user.dateOfBirth = dateOfBirth;
            user.gender = gender;
            user.height = height;
            user.weight = weight;
            user.bmi = bmi;
            user.country = country;
            user.noOfMeals = noOfMeals;
            user.userHealthGoal = userHealthGoal;
            user.dietTypePreference = dietTypePreference;
            user.exerciseFrequency = exerciseFrequency;
            user.medicalHistory = medicalHistory;
            user.profilePicture = profilePicture;
            user.fitnessLevel = fitnessLevel;
            user.preferredWorkoutType = preferredWorkoutType;
            user.timeAvailability = timeAvailability;
            user.equipmentAvailable = equipmentAvailable;

            const updatedUser = await user.save();
            return NextResponse.json({ message: "User Details Updated", success: true, updatedUser }, { status: 200 });
        }

        const newUser = new UserDetails({
            email: email,
            dateOfBirth: dateOfBirth,
            gender: gender,
            height: height,
            weight: weight,
            bmi: bmi,
            country: country,
            noOfMeals: noOfMeals,
            userHealthGoal: userHealthGoal,
            dietTypePreference: dietTypePreference,
            exerciseFrequency: exerciseFrequency,
            medicalHistory: medicalHistory,
            profilePicture: profilePicture,
            fitnessLevel: fitnessLevel,
            preferredWorkoutType: preferredWorkoutType,
            timeAvailability: timeAvailability,
            equipmentAvailable: equipmentAvailable,
        });

        const savedUser = await newUser.save();

        return NextResponse.json({ message: "User Details Saved successfully", success: true, savedUser }, { status: 200 });

    } catch (error: any) {
        console.error("Error saving user details:", error);
        return NextResponse.json({ message: "An error occurred while saving user details.", error: error.message }, { status: 500 });
    }
}
