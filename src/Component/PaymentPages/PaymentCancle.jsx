import React from 'react'
import { FaExclamationTriangle, FaHome, FaRedo, FaTimesCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router'

export default function PaymentCancle() {
    const navigate = useNavigate()
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-100 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center">

                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="bg-red-100 p-6 rounded-full">
                            <FaTimesCircle className="text-7xl text-red-500" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-800 mt-6">
                        Payment Cancelled
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Your payment process was cancelled before completion.
                    </p>

                    {/* Info Card */}
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">

                        <div className="flex items-center gap-4">
                            <FaExclamationTriangle className="text-3xl text-red-500" />

                            <div className="text-left">
                                <h3 className="font-semibold text-gray-800">
                                    Don't worry!
                                </h3>

                                <p className="text-sm text-gray-500">
                                    No payment has been deducted from your account.
                                    You can try again whenever you're ready.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-black text-white py-3 rounded-xl transition"
                        >
                            <FaHome />
                            Home
                        </Link>

                        <Link
                            onClick={() => navigate(-1)}
                            to="/membership"
                            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
                        >
                            <FaRedo />
                            Try Again
                        </Link>

                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-sm text-gray-400">
                        Need help? Contact our support team anytime.
                    </p>
                </div>
            </div>
        </div>
    )
}
