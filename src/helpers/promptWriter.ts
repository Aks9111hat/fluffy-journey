import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_GEMINI_KEY!);

export const promptWriter = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });


    const prompt = "Write a story about a vatican city of horrors."

    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(response);
    const text = response.text();
    console.log(text);
    return text;
}
