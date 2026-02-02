'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="error-wrapper">
            <style jsx>{`
        .error-wrapper {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #000;
          color: #fff;
          padding: 20px;
        }
        .error-code {
          font-size: clamp(100px, 15vw, 200px);
          font-weight: 800;
          margin: 0;
          line-height: 1;
          color: #ff0000; /* Subtle red for system errors */
        }
        .error-message {
          font-size: 1.2rem;
          margin: 20px 0 40px 0;
          opacity: 0.7;
        }
        .retry-button {
          padding: 12px 30px;
          background: #fff;
          color: #000;
          border: none;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .retry-button:hover {
          transform: scale(1.05);
        }
      `}</style>

            <h1 className="error-code">500</h1>
            <p className="error-message">Something went wrong on our end.</p>
            <button className="retry-button" onClick={() => reset()}>
                Try Again
            </button>
        </div>
    )
}