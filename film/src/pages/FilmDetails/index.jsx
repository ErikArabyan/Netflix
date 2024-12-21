import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { filmDetailsAPI } from "../../features/filmDetailsAPI/filmDetailsAPI";
import styles from "./style.module.css";
import { Star } from "./star";
import { payForFilmAPI } from "../../features/payForFilmAPI/payForFilmAPI";

export const FilmDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { film } = useSelector((state) => state.filmdetailsAPISlice);
    const video = useRef(null);
    const container = useRef(null);

    useEffect(() => {
        if (params.id) {
            dispatch(filmDetailsAPI(params)).unwrap().then(() => {
                if (video.current && container.current) {
                    const videoHeight = video.current.offsetHeight;
                    if (videoHeight) {
                        container.current.style.height = `${videoHeight}px`;
                    }
                }
            });
        }
    }, [params, dispatch]);

    const pay = () => {
        dispatch(payForFilmAPI(params.id))
    }

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
                            <button className='nbutton' onClick={pay}>buy the film</button>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
