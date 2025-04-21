import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { IPost } from "@/models/Post";
import { NextResponse } from "next/server";


interface Params {
    params: {
        id: string;
    }
}

export async function GET(req: Request, { params }: Params) {
    try {
      await connectToDatabase()
  
      const posts = await Post.find({ author: params.id })
        .populate('author')
        .sort({ createdAt: -1 })
  
      if (!posts) {
        return NextResponse.json(
          {
            success: false,
            message: 'No posts found for this user',
          },
          { status: 404 }
        )
      }
  
      return NextResponse.json(
        {
          success: true,
          message: 'User posts successfully fetched',
          posts,
        },
        { status: 200 }
      )
    } catch (error) {
      console.error('Error fetching user posts:', error)
      return NextResponse.json(
        {
          success: false,
          message: 'Server error while fetching posts',
        },
        { status: 500 }
      )
    }
  }

export async function PUT(req: Request, { params }: Params) {
    try {
        await connectToDatabase();
        const data: Partial<IPost> = await req.json();
        const updated = await Post.findByIdAndUpdate(params.id, data, { new: true });
        return NextResponse.json({
            success: true,
            message: "Update post successfully",
            updated,
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Unable to update user posts by Id",
        }, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        await connectToDatabase();
        const deletePost = await Post.findByIdAndDelete(params.id);
        return NextResponse.json({
            success: true,
            message: "Delete post successfully",
            deletePost,
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Unable to delete user posts by Id",
        }, { status: 500 })
    }
}