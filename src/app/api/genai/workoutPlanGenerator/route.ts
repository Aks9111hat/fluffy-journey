import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_GEMINI_KEY!);

const promptWriter = async (userPrompt: any) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const prompt = userPrompt;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userprompt } = reqBody
        const text = await promptWriter(userprompt);
        const response = NextResponse.json({ prompt: text, success: true }, { status: 200 })
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}