import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectToDatabase();
        const posts = await Post.find().populate('author').sort({createdAt: -1});
        return NextResponse.json({
            success: true,
            message: "All Posts are  fetched",
            posts,
        })
    } catch (error: any) {
        console.log("Error in fetching all posts", error);
        return NextResponse.json({
            success: false,
            message: "Error in fetching the all posts",
        });
    }
}