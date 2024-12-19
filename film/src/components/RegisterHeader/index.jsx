import styles from "./style.module.css";
import { NavLink } from "react-router-dom";

export const RegisterHeader = () => {
    return (
        <div className={styles.registerHeader}>
            <div className={styles.registerHeaderInner}>
                <div className={styles.left}>
                    <NavLink className={styles.logolink}>
                        <img className={styles.registerLogo} src="/netflix.png" alt="netflix logo" />
                    </NavLink>
                </div>
                <div className={styles.right}>
                    <NavLink to={"auth/login"}>
                        <button className={styles.registerAuthLinks}>Sign In</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
