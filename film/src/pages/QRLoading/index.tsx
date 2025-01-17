import { useEffect } from "react";
import { PageLoad } from "../../components/PageLoad";
import { useParams, useNavigate } from "react-router-dom";
import { useStringContext } from "../../main";

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
            if (data.event === 'authenticated' && data.given_name) {
                navigate('/')
            } else if (data.event === 'error') {
                alert(`Ошибка: ${data.message}`);
            }
            ws.close()
        };

        ws.onerror = () => {
            alert('Ошибка WebSocket. Попробуйте снова.');
            ws.close()
        };
    }, [SessionId, ipPort, token, navigate]);

    return (
        <div>
            <PageLoad isloading="" />
        </div>
    );
};
