
import { connect } from "@/dbConfig/dbConfig";
import UserPlans from "@/models/userPlans";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            email,
            dietPlan,
            workoutPlan,
        } = reqBody;
        const user = await UserPlans.findOne({ email });

        if (user) {
            let updatedUser = user
            if (workoutPlan) {
                user.workoutPlan = workoutPlan;
                updatedUser = await user.save();

            }
            if (dietPlan) {
                user.dietPlan = dietPlan;
                updatedUser = await user.save();

            }

            return NextResponse.json({ message: "User Details Updated", success: true, updatedUser }, { status: 200 });
        }

        const newUser = new UserPlans({
            email: email,
            dietPlan: dietPlan,
            workoutPlan: workoutPlan,
        });


        const savedUser = await newUser.save();

        return NextResponse.json({ message: "User Details Saved successfully", success: true, savedUser }, { status: 200 });

    } catch (error: any) {
        console.error("Error saving user details:", error);
        return NextResponse.json({ message: "An error occurred while saving user details.", error: error.message }, { status: 500 });
    }
}
