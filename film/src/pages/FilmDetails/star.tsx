import styles from "./style.module.css";
import { useParams } from "react-router";
import { rateAPI } from "../../features/rateAPI/rateAPI";
import { AppDispatch } from "../../application/store";

export const Star = ({ data }) => {
    const dispatch = AppDispatch();
    const params = useParams();
    const rate = (num) => {
        const data = { film_id: params.id, rate: num };
        dispatch(rateAPI(data));
    };
    return (
        <div className={styles.star}>
            <div onClick={() => {
                rate(data);
            }}
                className={styles.one}
            ></div>
            <div onClick={() => {
                rate(data + 1);
            }}
                className={styles.two}
            ></div>
        </div>
    );
};
