'use client';

import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { IPost } from "@/models/Post";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts/get-post", {
          withCredentials: true,
        });
        if (response.data.success) {
          setPosts(response.data.posts);
        }
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchPosts();
    }
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-black border-solid"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-4 sm:p-6 md:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          All Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length === 0 ? (
            <p className="text-gray-600 text-center w-full">No posts found.</p>
          ) : (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </div>
      </div>
    </>
  );
}
