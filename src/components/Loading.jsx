import React from 'react';

const Loading = () => {
    return (
        // Container untuk memposisikan spinner di tengah layar
        <div className="flex h-full items-center justify-center">
            <div
                className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"
                role="status"
                aria-label="loading"
            ></div>
        </div>
    );
};

export default Loading;