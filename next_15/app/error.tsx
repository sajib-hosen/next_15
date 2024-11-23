"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error); // Log the error for debugging
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Something went wrong!</h1>
          <p>{error.message}</p>
          <button
            onClick={() => {
              // Attempt to recover by resetting the error boundary
              reset();
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
