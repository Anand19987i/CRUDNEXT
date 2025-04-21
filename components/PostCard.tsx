import React from 'react'
import { CalendarIcon, UserIcon } from 'lucide-react'
import { IPost } from '@/models/Post'

interface PostCardProps {
  post: IPost
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const authorName =
    typeof post.author === 'object' && post.author?.name
      ? post.author.name
      : 'Unknown'

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : ''

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
    </div>
  )
}

export default PostCard
