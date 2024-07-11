import { connect } from "@/dbConfig/dbConfig";
import UserDetails from "@/models/userDetailsModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, dateOfBirth,
            gender,
            height,
            weight,
            country,
            noOfMeals,
            userHealthGoal,
            dietTypePreference,
            exerciseFrequency,
            medicalHistory, } = reqBody;

        //check if user already exists
        const user = await UserDetails.findOne({ email })
        console.log(user);

        if (user) {
            user.dateOfBirth = dateOfBirth;
            user.gender = gender;
            user.height = height;
            user.weight = weight;
            user.bmi = weight / (height * height);
            user.country = country;
            user.noOfMeals = noOfMeals;
            user.userHealthGoal = userHealthGoal;
            user.dietTypePreference = dietTypePreference;
            user.exerciseFrequency = exerciseFrequency;
            user.medicalHistory = medicalHistory;

            const updatedUser = await user.save();
            return NextResponse.json({ message: "User Details Updated", success: true, updatedUser }, { status: 200 });
        }


        const newUser = new UserDetails({
            email: email,
            dateOfBirth: dateOfBirth,
            gender: gender,
            height: height,
            weight: weight,
            bmi: weight / (height * height),
            country: country,
            noOfMeals: noOfMeals,
            userHealthGoal: userHealthGoal,
            dietTypePreference: dietTypePreference,
            exerciseFrequency: exerciseFrequency,
            medicalHistory: medicalHistory,
        })

        const savedUser = await newUser.save()

        return NextResponse.json({
            message: "UserDetails Saved successfully",
            success: true,
            savedUser
        }, { status: 200 })


    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}