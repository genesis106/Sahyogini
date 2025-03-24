import React from "react";
import { Link } from "react-router-dom"; 

export function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="relative h-10 w-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <span className="text-xl font-bold text-primary">Sahyogini</span>
    </Link>
  );
}
