import styles from "./style.module.css";
export const EmailSend = () => {
    return (
        <div className={styles.es}>
            <div className={styles.esInner}>
            <h1>Email Send</h1>
            <p>An email with instructions to reset your password has been sent to your provided email address.</p>
            <p>Please check your inbox and follow the steps to complete the process.</p>
            </div>
        </div>
    );
};