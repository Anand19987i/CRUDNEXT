import connectToDatabase from "@/lib/mongodb"
import Post from "@/models/Post";
import { NextResponse } from "next/server";

interface Params {
    params: {
        id: string;
    }
}

export async function GET(req: Request, { params }: Params) {
    try {
      await connectToDatabase()
  
      const post = await Post.findById(params.id)
        .populate('author')
  
      
  
      return NextResponse.json(
        {
          success: true,
          message: 'User post successfully fetched',
          post,
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
