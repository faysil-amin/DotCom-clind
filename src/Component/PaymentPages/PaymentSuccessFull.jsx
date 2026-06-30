import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import useAxiosSecure from '../../useAxiosSecure/useAxiosSecure';
import useAxios from '../../Hook/useAxios';
import { FaArrowRight, FaCheckCircle, FaHome, FaReceipt } from 'react-icons/fa';

export default function PaymentSuccessFull() {
    const [searchParams] = useSearchParams();
    const axiosSecure = useAxiosSecure();
    const axios = useAxios()
    const sessionId = searchParams.get("session_id");
    console.log(sessionId)
    useEffect(() => {
        if (sessionId) {
            const url = axios.patch(`/paymentSuccess?session_id=${sessionId}`)
            console.log("hello", url)
        }
    }, [sessionId, axiosSecure])

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
                <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 text-center">

                    {/* Success Icon */}
                    <div className="flex justify-center">
                        <div className="bg-green-100 p-6 rounded-full">
                            <FaCheckCircle className="text-7xl text-green-600" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold text-gray-800 mt-6">
                        Payment Successful!
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Your payment has been processed successfully.
                        Thank you for choosing us.
                    </p>

                    {/* Card */}
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mt-8 space-y-4">

                        <div className="flex items-center gap-4">
                            <FaReceipt className="text-2xl text-green-600" />
                            <div className="text-left">
                                <p className="text-sm text-gray-500">Transaction Status</p>
                                <h3 className="font-bold text-green-600">
                                    Completed
                                </h3>
                            </div>
                        </div>

                        <div className="border-t border-green-200 pt-4">
                            <p className="text-gray-500">
                                Your Premium Membership has been activated.
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 mt-8">

                        <Link
                            to="/"
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition"
                        >
                            <FaHome />
                            Home
                        </Link>

                        <Link
                            to="/dashboard"
                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
                        >
                            Dashboard
                            <FaArrowRight />
                        </Link>

                    </div>

                    <p className="mt-8 text-sm text-gray-400">
                        ❤️ Thank you for your purchase!
                    </p>
                </div>
            </div>
        </div>
    )
}
