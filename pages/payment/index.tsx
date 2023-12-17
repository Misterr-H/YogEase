import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Payment = () => {
    const router = useRouter();
    const [batch, setBatch] = useState(null);
    const [laoding, setLoading] = useState(false);

    useEffect(() => {
        const fetchBatch = async () => {
            setLoading(true);
            const response = await fetch(`/api/fetch-batch?id=${router.query.batchId}`);
            const data = await response.json();
            setBatch(data.batch);
            setLoading(false);
        };

        if (router.query.batchId) {
            fetchBatch();
        }
    }, [router.query.batchId]);

    const handlePayment = (e) => {
        e.preventDefault();
        // Here you can handle the payment.
        // For example, you can send a request to your payment gateway with the card details.
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">Payment</h1>
            {batch ? (
                <>
                    <p className="mb-4">You are enrolling in: {batch.name}</p>
                    <p className="mb-4">Timeslot: {batch.timeSlot}</p>
                    <form onSubmit={handlePayment} className="w-1/2">
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            className="block w-full mb-4 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="expiryDate"
                            placeholder="Expiry Date"
                            className="block w-full mb-4 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            className="block w-full mb-4 p-2 border border-gray-300 rounded"
                        />
                        <button type="submit" className="block w-full p-2 bg-blue-600 text-white rounded">
                            Pay Now
                        </button>
                    </form>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Payment;
