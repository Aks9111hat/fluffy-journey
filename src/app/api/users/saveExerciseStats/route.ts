
import { connect } from "@/dbConfig/dbConfig";
import exerciseStats from "@/models/exerciseStats";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            email, exerciseName, sets
        } = reqBody;
        const user = await exerciseStats.findOne({ email });



        const newExerciseStats = new exerciseStats({
            email: email,
            exerciseName: exerciseName,
            sets: sets,
            recordDate: new Date(),
        });


        const savedExerciseStats = await newExerciseStats.save();

        return NextResponse.json({ message: "Exercise Stats Saved successfully", success: true, savedExerciseStats }, { status: 200 });

    } catch (error: any) {
        console.error("Error saving user details:", error);
        return NextResponse.json({ message: "An error occurred while saving user details.", error: error.message }, { status: 500 });
    }
}
