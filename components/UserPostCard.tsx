'use client'

import React from 'react'
import { CalendarIcon, UserIcon, Trash2Icon, PencilIcon } from 'lucide-react'
import { IPost } from '@/models/Post'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface PostCardProps {
  post: IPost
  onDelete?: (id: string) => void // Optional callback to update UI after delete
}

const UserPostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const router = useRouter()

  const authorName =
    typeof post.author === 'object' && post.author?.name
      ? post.author.name
      : 'Unknown'

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : ''

  const handleEdit = () => {
    router.push(`/edit-post/${post._id}`)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      const res = await axios.delete(`/api/posts/user/${post._id}`)
      if (res.status === 200) {
        onDelete?.(post.id)
      }
    } catch (error) {
      console.error('Failed to delete post', error)
      alert('Delete failed')
    }
  }

  return (
    <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">{post.title}</h2>

      <p className="text-gray-600 text-sm mb-5 line-clamp-4">{post.content}</p>

      <div className="flex justify-between items-center text-gray-500 text-sm mt-4">
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4" />
          <span>{authorName}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <PencilIcon className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          <Trash2Icon className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  )
}

export default UserPostCard
