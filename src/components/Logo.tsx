import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center">
      <div className="text-green-600 mr-2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </div>
      <span className="font-bold text-xl text-gray-800">PrimeNest</span>
    </div>
  );
}
