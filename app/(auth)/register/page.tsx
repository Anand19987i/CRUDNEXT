'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const RegisterPage = () => {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            setLoading(true);
            const res = await axios.post('/api/register', form);
            if (res.data.success) {
                setLoading(false);
                router.push('/signin');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Register</h2>

                <span className="text-sm text-gray-500">
                    Already have an account? <Link href="/signin" className="text-blue-600">Sign in</Link>
                </span>

                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
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

                <div className="text-center text-sm text-gray-600 my-2">OR</div>

                <button
                    type="button"
                    onClick={() => signIn('github')}
                    className="flex w-full bg-black text-white py-2 rounded-lg hover:opacity-90 items-center justify-center gap-3"
                ><FaGithub />
                    Sign up with GitHub
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
