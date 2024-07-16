
import { connect } from "@/dbConfig/dbConfig";
import UserPlans from "@/models/userPlans";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            email,
        } = reqBody;
        const user = await UserPlans.findOne({ email });
        console.log(user)
        if (user) {

            return NextResponse.json({ message: "Plans are retrieved", success: true, userPlans: user }, { status: 200 });
        }



        return NextResponse.json({ message: "Please Generate the plans", success: false }, { status: 200 });

    } catch (error: any) {
        console.error("Error saving user details:", error);
        return NextResponse.json({ message: "An error occurred while saving user details.", error: error.message }, { status: 500 });
    }
}
