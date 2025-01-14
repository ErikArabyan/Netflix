import React, { useRef } from 'react';

export const Camera = () => {
    const videoRef = useRef(null);

    const handleCameraStart = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("doesn't have access to camera", error);
        }
    };

    return (
        <div>
            <button onClick={handleCameraStart}>Turn on camera</button>
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
};
