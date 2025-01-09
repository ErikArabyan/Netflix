import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './styles.module.css';
import { qrAPI } from '../../features/qrAPI/qrAPI';
import { useDispatch } from "react-redux";


export const LoginByQR = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const uniqueID = crypto.randomUUID()    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(qrAPI(uniqueID, 'login'))
    }, [uniqueID, dispatch])

    return (
        <section className={styles.qrbg}>
            <h1 className={styles.header}>Login By Qr Code.</h1>
            <div className={styles.qr}>
                <QRCodeSVG bgColor="rgba(25, 25, 25, 0)" fgColor="rgba(255 ,255 ,255 ,1)" value={`https://192.168.1.213:3000/load/${uniqueID}/`} size={screenWidth < screenHeight ? screenWidth * 60 / 100 : screenHeight * 60 / 100} />
            </div>
        </section>
    );
};