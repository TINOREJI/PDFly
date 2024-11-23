import React from 'react'

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-purple-700">404</h1>
      <p className="mt-4 text-lg text-gray-700">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="mt-6 px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-800 transition duration-300 font-semibold">Go Back Home</a>
    </div>
  )
}

export default ErrorPage