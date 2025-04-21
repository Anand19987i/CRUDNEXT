import Post, { IPost } from "@/models/Post";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const data: IPost = await req.json();
        const newPost = await Post.create(data);
        return NextResponse.json({
            success: true,
            message: "Create post successfully",
            newPost,
        }, { status: 201 });
    } catch (error) {
        console.error("Error in creating post:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}