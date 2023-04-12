import React, { FC } from "react";

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div className="border border-slate-300 shadow rounded-md p-2  w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-3 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default Spinner;

// <div className={`inline-block ${className}`}>
//   <div className="border-4 border-t-4 border-gray-200 rounded-full animate-spin h-12 w-12"></div>
// </div>
