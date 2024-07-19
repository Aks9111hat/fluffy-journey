import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import UserDetails from "@/models/userDetailsModel";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_GEMINI_KEY!);

const dietPlanGenerator = async (userPrompt: any) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = await response.text();
    return text;
};

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, userPrompt } = reqBody;

        // Fetch user details from the database
        const user = await UserDetails.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        // Create a prompt including user details
        const prompt = `
            Act as a 'Dietician' and create a personalized diet plan in JSON format for a user with the following details:
            - Gender: ${user.gender}
            - Age: ${new Date().getFullYear() - user.dateOfBirth.getFullYear()}
            - Height: ${user.height} cm
            - Weight: ${user.weight} kg
            - BMI: ${user.bmi}
            - Country: ${user.country}
            - Number of Meals: ${user.noOfMeals}
            - Health Goal: ${user.userHealthGoal}
            - Diet Type Preference: ${user.dietTypePreference}
            - Exercise Frequency: ${user.exerciseFrequency} times per week
            - Medical History: ${user.medicalHistory || "None"}
            ${userPrompt ? `- Additional Instructions: ${userPrompt}` : ""}

            Design the diet plan according to user's "Number of Meals","Health Goal","Diet Type Preference". The Number of meals in json should Match the user's "Number of Meals".

            The response should be a valid JSON object without any code block formatting, formatted as follows:
            {
                "daily_diet_plan": {
                    "meal_1": {
                        "dish": "Oatmeal with Fresh Berries",
                        "amount": "200 grams",
                        "calories": 300,
                        "nutrients": {
                            "protein": "10 grams",
                            "carbohydrates": "50 grams",
                            "fat": "5 grams",
                            "fiber": "8 grams"
                        }
                    },
                    "meal_2": {
                        "dish": "Grilled Chicken Salad",
                        "amount": "300 grams",
                        "calories": 400,
                        "nutrients": {
                            "protein": "30 grams",
                            "carbohydrates": "15 grams",
                            "fat": "18 grams",
                            "fiber": "5 grams"
                        }
                    },
                    "meal_3": {
                        "dish": "Quinoa and Vegetable Stir-fry",
                        "amount": "250 grams",
                        "calories": 350,
                        "nutrients": {
                            "protein": "12 grams",
                            "carbohydrates": "60 grams",
                            "fat": "10 grams",
                            "fiber": "7 grams"
                        }
                    },
                    "meal_4": {
                        "dish": "Greek Yogurt with Honey",
                        "amount": "150 grams",
                        "calories": 200,
                        "nutrients": {
                            "protein": "10 grams",
                            "carbohydrates": "25 grams",
                            "fat": "5 grams",
                            "fiber": "0 grams"
                        }
                    },
                    "meal_5": {
                        "dish": "Grilled Salmon with Steamed Broccoli",
                        "amount": "250 grams",
                        "calories": 500,
                        "nutrients": {
                            "protein": "35 grams",
                            "carbohydrates": "10 grams",
                            "fat": "30 grams",
                            "fiber": "5 grams"
                        }
                    },
                    "meal_6": {
                        "dish": "Mixed Nuts",
                        "amount": "50 grams",
                        "calories": 150,
                        "nutrients": {
                            "protein": "5 grams",
                            "carbohydrates": "8 grams",
                            "fat": "13 grams",
                            "fiber": "3 grams"
                        }
                    }
                }
            }

        `;

        const text = await dietPlanGenerator(prompt);
        console.log(text)

        // const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        // Regular expression to extract JSON
        const startIndex = text.indexOf('{');
        const endIndex = text.lastIndexOf('}');
        const cleanedText = text.substring(startIndex, endIndex + 1);
        // console.log(text)
        console.log(cleanedText)

        // Ensure the response is valid JSON
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(cleanedText);
        } catch (error) {
            return NextResponse.json({ error: "Failed to parse JSON response", details: text }, { status: 500 });
        }

        return NextResponse.json({ dietPlan: jsonResponse, message: "Diet plan Generated", success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
