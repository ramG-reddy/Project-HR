import { connectMongoDB } from "@libs/mongo";
import Video from "@models/vidSchema";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { title, link, stkids } = await req.json();
  try {
    await connectMongoDB();
    const newVideo = await Video.create({ title, link, stkids });
    return NextResponse.json({ message: "POST success", newVideo});
  } catch (error) {
    return NextResponse.json({ message: "POST error", error: error.message });
  }
}

export const GET = async () => {
  try {
    await connectMongoDB();
    const videos = await Video.find({});
    return NextResponse.json({ message: "GET success", videos });
  } catch (error) {
    return NextResponse.json({ message: "GET error", error: error.message });
  }
}