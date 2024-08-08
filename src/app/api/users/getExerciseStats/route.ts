
// import { connect } from "@/dbConfig/dbConfig";
// import exerciseStats from "@/models/exerciseStats";
// import { NextRequest, NextResponse } from "next/server";

// connect();

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const {
//             email, exerciseName,
//         } = reqBody;
//         const stats = await exerciseStats.find({ email,exerciseName });

//         return NextResponse.json({ message: "Exercise Stats retrieved successfully", success: true, stats }, { status: 200 });

//     } catch (error: any) {
//         console.error("Error saving user details:", error);
//         return NextResponse.json({ message: "An error occurred while saving user details.", error: error.message }, { status: 500 });
//     }
// }


import { connect } from "@/dbConfig/dbConfig";
import exerciseStats from "@/models/exerciseStats";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, exerciseName, startDate, endDate } = reqBody;

        const query: any = { email, exerciseName };
        if (startDate && endDate) {
            query.recordDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const stats = await exerciseStats.find(query);

        return NextResponse.json({ message: "Exercise Stats retrieved successfully", success: true, stats }, { status: 200 });

    } catch (error: any) {
        console.error("Error retrieving exercise stats:", error);
        return NextResponse.json({ message: "An error occurred while retrieving exercise stats.", error: error.message }, { status: 500 });
    }
}

