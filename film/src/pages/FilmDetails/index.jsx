import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { filmDetailsAPI } from "../../features/filmDetailsAPI/filmDetailsAPI";
import styles from "./style.module.css";
import { Star } from "./star";

export const FilmDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { film } = useSelector((state) => state.filmdetailsAPISlice);
    const video = useRef(null);
    const container = useRef(null);

    useEffect(() => {
        if (params.id) {
            dispatch(filmDetailsAPI(params)).unwrap().then(() => {
                if (video.offsetHeight) {
                    container.style.height = video.offsetHeight + 'px'
                }
            })
        }
    }, [params, dispatch]);

    return (
        <div className={styles.fd}>
            {film?.name && film.film?.[0] ? (
                <div>
                    <img className={styles.fdImg} src={`http://127.0.0.1:8000/${film.image}`} alt="Film" />
                    <div className={styles.fon}></div>
                    <div className={styles.videoContainer}>
                        <div className={styles.videoContainerInnder} ref={container}>
                            <video className={styles.videoFon} autoPlay muted loop ref={video}>
                                <source src={`http://127.0.0.1:8000/${film.film?.[0]}`} type="video/mp4" />
                            </video>
                            <video className={styles.video} autoPlay muted loop>
                                <source src={`http://127.0.0.1:8000/${film.film?.[0]}`} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <div className={styles.otherData}>
                        <div className={styles.rating}>
                            {[...Array(5)].map((_, i) => <Star key={i} data={i + 1} />)}
                        </div>
                        <div className={styles.buy}>
                            <a className='nbutton' href="http://127.0.0.1:8000/payment/1">buy the film</a>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
