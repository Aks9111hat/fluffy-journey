import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import UserDetails from "@/models/userDetailsModel"; 

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_GEMINI_KEY!);

const promptWriter = async (userPrompt:any) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = await response.text();
    return text;
};

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, userPrompt } = reqBody;

        // Fetch user details from the database
        const user = await UserDetails.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Create a prompt including user details
        const prompt = `
            Create a personalized workout plan for a user with the following details:
            - Gender: ${user.gender}
            - Age: ${new Date().getFullYear() - user.dateOfBirth.getFullYear()}
            - Height: ${user.height} cm
            - Weight: ${user.weight} kg
            - BMI: ${user.bmi}
            - Country: ${user.country}
            - Health Goal: ${user.userHealthGoal}
            - Exercise Frequency: ${user.exerciseFrequency} times per week
            - Medical History: ${user.medicalHistory || "None"}
            ${userPrompt ? `- Additional Instructions: ${userPrompt}` : ""}
        `;

        const text = await promptWriter(prompt);

        return NextResponse.json({ prompt: text, success: true }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
