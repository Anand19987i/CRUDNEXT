'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { IPost } from '@/models/Post'
import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react'
import UserPostCard from '@/components/UserPostCard'

const UserProfilePage = () => {
    const { id } = useParams()
    const { data: session, status } = useSession()
    const [posts, setPosts] = useState<IPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/posts/user/${id}`, {
                    credentials: 'include',
                })

                const data = await res.json()
                setPosts(data.posts || [])
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchPosts()
    }, [id])

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-black border-solid"></div>
    </div>
    if (error) return <p className="p-6 text-red-500">{error}</p>

    return (
        <>
            <Navbar />
            <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
                    {session?.user.name} Posts
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {posts.length === 0 ? (
                        <p className="text-center text-gray-600 col-span-full">
                            No posts found.
                        </p>
                    ) : (
                        posts.map((post) => <UserPostCard key={post.id} post={post} />)
                    )}
                </div>
            </div>
        </>
    )
}

export default UserProfilePage
