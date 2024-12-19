import { useDispatch } from "react-redux";
import styles from "./style.module.css";
import { useParams } from "react-router";
import { rateAPI } from "../../features/rateAPI/rateAPI";

export const Star = ({ data }) => {
    const dispatch = useDispatch();
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
