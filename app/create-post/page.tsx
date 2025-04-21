'use client'

import Navbar from '@/components/Navbar'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreatePostPage = () => {
  const { data: session, status } = useSession()
  const authorId = session?.user.id
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    content: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
        setLoading(true);
      const response = await axios.post(
        '/api/posts/create-post',
        {
          ...form,
          author: authorId,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      if (response.status === 201) {
        setLoading(false);
        router.push(`/profile/${authorId}`)
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md space-y-5"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            Create New Post
          </h2>

          <input
            name="title"
            placeholder="Post Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <textarea
            name="content"
            placeholder="Write your content..."
            value={form.content}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className={`w-full py-2 rounded-lg transition ${
              loading
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              'Create Post'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePostPage
