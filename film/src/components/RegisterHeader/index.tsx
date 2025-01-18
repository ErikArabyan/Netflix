import { Netflix } from "../svgs/Netflix";
import styles from "./style.module.css";
import { NavLink } from "react-router-dom";

export const RegisterHeader = () => {
    return (
        <header className={styles.registerHeader}>
            <div className={styles.registerHeaderInner}>
                <div>
                    <NavLink to={'/'}>
                        <Netflix/>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={"auth/login"}>
                        <button className={styles.registerAuthLinks}>Sign In</button>
                    </NavLink>
                </div>
            </div>
        </header>
    );
};
