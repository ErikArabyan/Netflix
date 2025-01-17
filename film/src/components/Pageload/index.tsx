import styles from "./style.module.css";

interface PageLoadProps {
	isloading: string
}
export const PageLoad: React.FC<PageLoadProps> = ({ isloading='' }) => {
    return (
        <div className={[styles.pageload, isloading === 'hide' ? 'hide' : ''].join(' ')}>
            <div className={styles.redline1}></div>
            <div className={styles.redline2}></div>
            <div className={styles.redline3}></div>
        </div>
    );
};