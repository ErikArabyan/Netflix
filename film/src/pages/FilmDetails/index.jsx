import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { filmDetailsAPI } from "../../features/filmDetailsAPI/filmDetailsAPI";
import "./style.css";
import { rateAPI } from "../../features/rateAPI/rateAPI";

export const FilmDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { film } = useSelector((state) => state.filmdetailsAPISlice);    
    const video = useRef(null);
    const canvas = useRef(null);

    useEffect(() => {
        if (params.id) {
            dispatch(filmDetailsAPI(params));
        }
    }, [dispatch, params]);

    useEffect(() => {
        const ctx = canvas.current?.getContext("2d");
        if (video.current && ctx) {
            const draw = () => {
                if (!video.current) return;
                ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
                ctx.drawImage(video.current, 0, -25, canvas.current.width, canvas.current.height);
                ctx.filter = "blur(15px)";
                requestAnimationFrame(draw);
            };
            const onVideoPlay = () => {
                draw();
            };
            if (video.current.readyState >= 3) {
                onVideoPlay();
            } else {
                video.current.oncanplay = onVideoPlay;
            }
        }
    }, [video, canvas]);

    const rate = (num) => {
        const data = {'film_id': params.id, 'rate': num}
        dispatch(rateAPI(data))
    }

    return (
        <div className="fd">
            <img className="fd-img" src={`http://127.0.0.1:8000/${film.image}`} alt="Film" />
            <div className="canvasContainer">
            <canvas className="canvas" ref={canvas}></canvas>
            </div>
            <div className="video-container">
                <video className="video" autoPlay muted loop ref={video}>
                    <source src={`http://127.0.0.1:8000/${film.film?.[0]}`} type="video/mp4" />
                </video>
            </div>
            <div className="other-data">
                <div className="rating">
                    <div className="star">
                        <div className="one" onClick={() => {rate(1)}}></div>
                        <div className="two" onClick={() => {rate(2)}}></div>
                    </div>
                    <div className="star">
                        <div className="one" onClick={() => {rate(3)}}></div>
                        <div className="two" onClick={() => {rate(4)}}></div>
                    </div>
                    <div className="star">
                        <div className="one" onClick={() => {rate(5)}}></div>
                        <div className="two" onClick={() => {rate(6)}}></div>
                    </div>
                    <div className="star">
                        <div className="one" onClick={() => {rate(7)}}></div>
                        <div className="two" onClick={() => {rate(8)}}></div>
                    </div>
                    <div className="star">
                        <div className="one" onClick={() => {rate(9)}}></div>
                        <div className="two" onClick={() => {rate(10)}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
