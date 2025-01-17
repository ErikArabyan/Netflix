import styles from "./style.module.css";
import { NavLink } from "react-router-dom";

export const RegisterHeader = () => {
    return (
        <header className={styles.registerHeader}>
            <div className={styles.registerHeaderInner}>
                {/* <div className={styles.left}> */}
                <div>
                    {/* <NavLink className={styles.logolink} to={'/'}> */}
                    <NavLink to={'/'}>
                        <img className={styles.registerLogo} src="/netflix.png" alt="netflix logo" />
                    </NavLink>
                </div>
                {/* <div className={styles.right}> */}
                <div>
                    <NavLink to={"auth/login"}>
                        <button className={styles.registerAuthLinks}>Sign In</button>
                    </NavLink>
                </div>
            </div>
        </header>
    );
};
