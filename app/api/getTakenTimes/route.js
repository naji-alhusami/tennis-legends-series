import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  if (req.method === "GET") {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("takenTimes");

    try {
      const takenTimes = await collection.find({}).toArray();
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
    } finally {
      client.close();
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
