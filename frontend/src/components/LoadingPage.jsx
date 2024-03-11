import React from 'react';

const LoadingPage = () => {
    return (
        <div className="bg-custom-30 flex items-center justify-center h-screen">
            <div className="text-center justify-center">
                <h1 className="text-3xl font-semibold mb-4">Please Wait...</h1>
                <div className="inline-block animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-gray-900"></div>
            </div>

        </div>
    );
};

export default LoadingPage;

