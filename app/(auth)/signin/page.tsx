'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const Page = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const result = await signIn('credentials', {
            email: form.email,
            password: form.password,
            redirect: false,
        });

        if (result?.ok) {
            setLoading(false)
            router.push('/');
        } else {
            setError('Invalid credentials');
        }
    };

    const handleGitHubLogin = async () => {
        await signIn('github', { callbackUrl: '/' });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-xl w-full max-w-md p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
                <p className="text-sm text-center text-gray-500">
                    Not registered yet?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className={`w-full py-2 rounded-lg transition ${loading
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
                            'Sign in'
                        )}
                    </button>
                </form>

                <div className="flex items-center justify-center">
                    <span className="text-gray-500 text-sm">or</span>
                </div>

                <button
                    type="button"
                    onClick={handleGitHubLogin}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition text-gray-800 font-medium"
                >
                    <FaGithub className="text-xl" />
                    Sign in with GitHub
                </button>
            </div>
        </div>
    );
};

export default Page;
