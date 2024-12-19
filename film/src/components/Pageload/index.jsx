// import { useEffect } from "react";
import styles from "./style.module.css";

export const Pageload = ({isloading}) => {
    return (
        <div className={[styles.pageload, isloading ? styles.hide : ''].join(' ')}>
            <div className={styles.redline1}></div>
            <div className={styles.redline2}></div>
            <div className={styles.redline3}></div>
        </div>
    );
};
