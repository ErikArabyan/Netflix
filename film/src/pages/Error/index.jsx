import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

export const Error = () => {
    return (
        <div className={styles.error}>
            <div className={styles.blur}></div>
            <div className={styles.errorInner}>
                <div className={styles.top}>
                    <h1 className={styles.lost}>Lost your way?</h1>
                    <br />
                    <p>Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                    <button className={styles.errorButton}>
                        <NavLink className={styles.errorLink} to={"/"}>Netflix Home</NavLink>
                    </button>
                </div>
                <div className={styles.bottom}>
                    <span className={styles.errorCode}>
                        Error Code <strong>NSES-404</strong>
                    </span>
                </div>
            </div>
            <span className={styles.imageSource}>
                FROM <strong>LOST IN SPACE</strong>
            </span>
        </div>
    );
};
