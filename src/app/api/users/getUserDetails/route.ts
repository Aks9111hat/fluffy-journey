import UserDetails from "@/models/userDetailsModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            email
        } = reqBody;
        const user = await UserDetails.findOne({ email });

        if (user) {
            return NextResponse.json({ message: "Details Retrieved Successfull", success: true, userDetails: user }, { status: 200 });
        }
        return NextResponse.json({ message: "User Details Do Not Exist", success: false }, { status: 200 });


    } catch (error: any) {
        return NextResponse.json({ message: "An error occurred while getting user details.", error: error.message }, { status: 500 });
    }
}
