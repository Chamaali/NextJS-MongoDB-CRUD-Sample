import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();

  try {
    await connectMongoDB();
    await Topic.create({ title, description });
    return NextResponse.json(
      { message: "Topic created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function GET(request) {
  try {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
  } catch (error) {
    return NextResponse.json({ message: "Topic not found" });
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Topic was not deleted." });

  }
}
