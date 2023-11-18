import { NextResponse } from "next/server";

import TakenTime from "@/models/takenTimeModel";
import connectToDatabase from "@/lib/db";

connectToDatabase();

export async function GET(req) {
  if (req.method === "GET") {
    try {
      // Fetch data using Mongoose
      const takenTimes = await TakenTime.find({}).maxTimeMS(30000);;
      return NextResponse.json(
        { data: takenTimes },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json(
        { message: "Getting Items Failed!" },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Invalid request method!" },
      {
        status: 500,
      }
    );
  }
}
