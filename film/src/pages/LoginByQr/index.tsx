import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './styles.module.css';
import { useStringContext } from '../../main';
import { useNavigate } from 'react-router-dom';
import { socialAuth } from '../../features/userAPI/userSlice';
import { AppDispatch } from '../../application/store';

export const LoginByQR = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const { ipPort } = useStringContext();
    const [ uniqueID ] = useState(crypto.randomUUID());
    const navigate = useNavigate();
    const dispatch = AppDispatch()

    useEffect(() => {        
        const ws = new WebSocket(`wss://${ipPort}/ws/auth/qr-auth/${uniqueID}/`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.given_name) {
                dispatch(socialAuth(data))
			}
            document.cookie = `token=${data.token}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`
            if (data.event === 'authenticated' && data.given_name) {
                navigate('/');
            } else if (data.event === 'error') {
                alert(`Ошибка: ${data.message}`);
            }
            ws.close()
        };

        ws.onerror = () => {
            alert('Ошибка WebSocket. Попробуйте снова.');
            ws.close()
        };
    }, [ipPort, uniqueID, navigate]);

    return (
        <section className={styles.qrbg}>
            <h1 className={styles.header}>Login By QR Code.</h1>
                <div className={styles.qr}>
                    <QRCodeSVG
                        bgColor="rgba(25, 25, 25, 0)"
                        fgColor="rgba(255 ,255 ,255 ,1)"
                        value={`${window.location.origin}/load/${uniqueID}/`}
                        size={screenWidth < screenHeight ? screenWidth * 0.6 : screenHeight * 0.6}
                    />
                </div>
        </section>
    );
};
