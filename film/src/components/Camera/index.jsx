import React, { useRef } from 'react';

export const Camera = () => {
    const videoRef = useRef(null);

    const handleCameraStart = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Не удалось получить доступ к камере: ', error);
        }
    };

    return (
        <div>
            <button onClick={handleCameraStart}>Включить камеру</button>
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
};
