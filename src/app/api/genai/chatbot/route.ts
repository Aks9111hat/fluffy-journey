// import { NextRequest, NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_GEMINI_KEY!);
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const { message } = reqBody;

//         const result = await model.generateContent(message);
//         const response = await result.response;
//         const text = response.text();

//         return NextResponse.json({ message: "Response generated successfully", success: true, reply: text }, { status: 200 });
//     } catch (error: any) {
//         return NextResponse.json({ message: "An error occurred while generating response.", error: error.message }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Ensure you have your API key set as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_GEMINI_KEY!);


const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chat: any;

export async function POST(request: NextRequest) {
    const { message } = await request.json();

    if (!chat) {
        chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 100,
            },
        });
    }

    try {
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        return NextResponse.json({ reply: text });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
