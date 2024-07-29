import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import UserDetails from "@/models/userDetailsModel";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_GEMINI_KEY!);

const workoutPlanGenerator = async (userPrompt: any) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = await response.text();
    return text;
};


function sanitizeJSONResponse(text: string): string {
    // Remove any leading/trailing text that isn't part of the JSON
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    const cleanedText = text.substring(startIndex, endIndex + 1);

    const sanitizedText = cleanedText
        .replace(/":\s*as\s*many\s*as\s*possible/g, '": "as many as possible"') // Fix "as many as possible" string
        .replace(/"reps":\s*Max/g, '"reps": "Max"') // Fix Max value for reps
        .replace(/(\w+)"\s*:\s*(\d+)\s*minutes/g, '"$1": "$2 minutes"') // Add quotes around duration values with time units
    // Fix common JSON formatting issues
    // const sanitizedText = cleanedText
    //     .replace(/""/g, '"') // Remove duplicate double quotes
    //     .replace(/(\w+)"\s*:\s*(\d+)\s*minutes/g, '"$1": "$2 minutes"') // Add quotes around duration values with time units
    //     .replace(/"\s*:\s*([^"]+)(?=\s*,|\s*\})/g, '": "$1"') // Ensure all values are properly quoted
    //     .replace(/":\s*as\s*many\s*as\s*possible/g, '": "as many as possible"') // Fix "as many as possible" string
    //     .replace(/"reps":\s*Max/g, '"reps": "Max"'); // Fix Max value for reps

    return sanitizedText;
}


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, userPrompt, workoutSplit } = reqBody;

        // Fetch user details from the database
        const user = await UserDetails.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        // Create a prompt including user details
        const prompt = `
Act as a 'Personal Trainer' and create a personalized workout plan in JSON format for a user with the following details:
- Gender: ${user.gender}
- Age: ${new Date().getFullYear() - user.dateOfBirth.getFullYear()}
- Height: ${user.height} cm
- Weight: ${user.weight} kg
- BMI: ${user.bmi}
- Country: ${user.country}
- Fitness Level: ${user.fitnessLevel}
- Preferred Workout Type: ${user.preferredWorkoutType}
- Time Availability: ${user.timeAvailability}
- Specific Goals: ${user.specificGoals}
- Exercise Frequency: ${user.exerciseFrequency} times per week
- Injuries/Limitations: ${user.injuriesLimitations || "None"}
- Equipment Available: ${user.equipmentAvailable}
- Workout Split: ${workoutSplit}
${userPrompt ? `- Additional Instructions: ${userPrompt}` : ""}

Design the workout plan according to user's "Fitness Level", "Preferred Workout Type", "Specific Goals", and "Equipment Available". The workout plan should include warm-up, main exercises, and cool-down. The plan should be based on Workout Split. Include multiple exercises in the main workout for better muscle growth. The workout plan should be for one week (number of days: ${user.exerciseFrequency}).

The response should be a valid JSON object without any code block formatting, formatted as follows:
{
    "weekly_workout_plan": {
        "day_1": {
            "warmup": {
                "exercise": "Jumping Jacks",
                "duration": "5 minutes",
                "calories": 50
            },
            "main_workout": [
                {
                    "exercise": "Squats",
                    "sets": 3,
                    "reps": 12,
                    "calories": 100
                },
                {
                    "exercise": "Lunges",
                    "sets": 3,
                    "reps": 15,
                    "calories": 90
                }
            ],
            "cooldown": {
                "exercise": "Stretching",
                "duration": "10 minutes",
                "calories": 30
            }
        },
        "day_2": {
            "warmup": {
                "exercise": "Jump Rope",
                "duration": "5 minutes",
                "calories": 60
            },
            "main_workout": [
                {
                    "exercise": "Push-ups",
                    "sets": 3,
                    "reps": 15,
                    "calories": 90
                },
                {
                    "exercise": "Bench Press",
                    "sets": 3,
                    "reps": 10,
                    "calories": 110
                }
            ],
            "cooldown": {
                "exercise": "Yoga",
                "duration": "10 minutes",
                "calories": 40
            }
        }
    }
}
`;


        const text = await workoutPlanGenerator(prompt);
        const cleanedText = sanitizeJSONResponse(text);
        console.log(cleanedText)
        // Ensure the response is valid JSON
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(cleanedText);
        } catch (error) {

            return NextResponse.json({ error: "Failed to parse JSON response", details: text }, { status: 500 });
        }

        return NextResponse.json({ workoutPlan: jsonResponse, message: "Workout plan Generated", success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
