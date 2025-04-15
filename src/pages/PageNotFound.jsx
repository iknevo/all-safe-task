import React from "react";
import { Link } from "react-router";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-neutral-300">404</h1>
        <h2 className="mb-2 text-2xl font-bold text-neutral-300">
          Page Not Found
        </h2>
        <p className="mb-8 text-white">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-neutral-600 px-6 py-3 text-base font-medium text-white hover:bg-neutral-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
