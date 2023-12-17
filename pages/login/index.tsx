import React, { useState } from 'react';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make a POST request to the /api/login endpoint with the form data
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok) {
            // Login was successful
            // Store the token in localStorage
            localStorage.setItem('token', data.token);
            // You can redirect the user to the home page
            // For now, let's just log the success message
            console.log(data.message);
        } else {
            // Login failed
            // Display the error message
            setError(data.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">Login to YogEase</h1>
            <form onSubmit={handleSubmit} className="w-1/2">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded text-black"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded text-black"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="block w-full p-2 bg-blue-600 text-white rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
