import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, actionLabel, actionPath, children }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        {children && <div className="mt-2">{children}</div>}
      </div>
      
      {actionLabel && actionPath && (
        <Link
          to={actionPath}
          className="mt-4 sm:mt-0 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default PageHeader; 