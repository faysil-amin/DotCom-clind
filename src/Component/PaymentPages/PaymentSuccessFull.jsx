import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import useAxiosSecure from '../../useAxiosSecure/useAxiosSecure';
import useAxios from '../../Hook/useAxios';

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
            payment successfull
        </div>
    )
}
