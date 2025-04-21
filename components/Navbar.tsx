'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const { data: session } = useSession()
  const id = session?.user?.id
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold">
            CRUDNEXT
          </Link>

          <div className="flex items-center sm:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:flex gap-8 items-center">
            <Link href="/create-post" className="hover:text-gray-300">
              Create Post
            </Link>
            <Link href={`/profile/${id}`} className="hover:text-gray-300">
              View Profile
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/signin' })}
              className="hover:text-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-3">
          <Link href="/create-post" onClick={toggleMenu} className="block hover:text-gray-300">
            Create Post
          </Link>
          <Link href={`/profile/${id}`} onClick={toggleMenu} className="block hover:text-gray-300">
            View Profile
          </Link>
          <button
            onClick={() => {
              toggleMenu()
              signOut({ callbackUrl: '/signin' })
            }}
            className="block w-full text-left hover:text-gray-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
