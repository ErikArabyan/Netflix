import React, { useEffect } from "react";
import { PageLoad } from "../../components/PageLoad";
import { useParams, useNavigate } from "react-router-dom";
import { useStringContext } from "../..";

export const QRLoading = () => {
    const { SessionId } = useParams();
    const { ipPort } = useStringContext();
    const navigate = useNavigate();
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    useEffect(() => {
        if (!SessionId || !token) {
            alert('Нет SessionId или токена. Пожалуйста, авторизуйтесь заново.');
            navigate('/');
            return;
        }

        const ws = new WebSocket(`wss://${ipPort}/ws/auth/qr-auth/${SessionId}/`);

        ws.onopen = () => {
            ws.send(JSON.stringify({ token: token }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Message from server:', data);

            if (data.event === 'authenticated' && data.given_name) {
                navigate('/');  // Переход на главную страницу
            } else if (data.event === 'error') {
                alert(`Ошибка: ${data.message}`);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            alert('Ошибка WebSocket. Попробуйте снова.');
        };

        return () => {
            ws.close();
        };
    }, [SessionId, ipPort, token, navigate]);

    return (
        <div>
            <PageLoad />
        </div>
    );
};
