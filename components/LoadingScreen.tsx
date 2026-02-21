import React from "react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <p className="text-gray-500 text-lg font-medium">{message || "جاري التحميل..."}</p>
    </div>
  );
};

export default LoadingScreen;