import { useDispatch, useSelector } from "react-redux";
import "./HomeStyle.css";
import { useEffect, useRef } from "react";
import { filmsAPI } from "../../features/filmsAPI/filmsAPI";
import { Link, NavLink } from "react-router-dom";
import { userAPI } from "../../features/userAPI/userAPI";

export const Home = () => {
    const { user } = useSelector((state) => state.userAPI.user);    
    const { genres } = useSelector((state) => state.filmsAPI);
    const { films } = useSelector((state) => state.filmsAPI);
    const len = genres.length - 1;
    const token = localStorage.getItem("token");
    const slideRef = useRef([]);
    const dispatch = useDispatch();
    const scrollby = window.innerWidth - 350;
    
    useEffect(() => {
        dispatch(filmsAPI())
            .unwrap()
            .then(() => {
                setTimeout(() => {
                    for (let i of slideRef.current) {
                        if (+i?.scrollWidth < +window.innerWidth) {
                            i.children[i.children.length - 1].children[0].classList.add("hide");
                        }
                    }
                }, 20);
            });
        if (token) {
            dispatch(userAPI());
        }
    }, [dispatch, token]);

    const scrollSlide = (params, index, direction) => {
        const container = slideRef.current[index];
        if (!container) return;
        const scrollAmount = direction === "prev" ? -scrollby : scrollby;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        if (container.scrollLeft - scrollby <= 0 && direction === "prev") {
            params.target.classList.add("hide");
        }
        if (container.scrollLeft + scrollby * 2 >= container.scrollWidth && direction === "next") {
            params.target.classList.add("hide");
        }
        if (direction === "prev" && container.scrollLeft + scrollby * 2 >= container.scrollWidth) {
            container.children[container.children.length - 1].children[0].classList.remove("hide");
        }
        if (direction === "next" && container.scrollLeft >= 0) {
            container.children[0].children[0].classList.remove("hide");
        }
    };

    return (
        <div>
            <div className="home_text">
                <h1 className="heading">Movies</h1>
                <p className="heading_text">Movies move us like nothing else can, whether they're scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.</p>
            </div>
            {genres.map((i, index) => {
                const filteredFilms = films.filter((j) => j.genres.includes(i));
                if (filteredFilms.length === 0) {
                    return null;
                }
                return (
                    <div key={index}>
                        <div className={`movies ${+index === +len ? "blured" : ""}`}>
                            <h4 className="block">{i}</h4>
                            <div className="filmgenre" ref={(el) => (slideRef.current[index] = el)}>
                                <div className="changeslide" onClick={(params) => scrollSlide(params, index, "prev")}>
                                    <img src="/back.png" className="changeslideleft hide" alt="" />
                                </div>
                                {filteredFilms.map((j, filmindex) => (
                                    <div key={filmindex} className="cart">
                                        {user?.username ? (
                                            <Link className="filmlink" to={`film/${j.id}/${j.name}`}>
                                                <img src={`http://127.0.0.1:8000/${j.image}`} alt={j.name} />
                                                <p>{j.name}</p>
                                            </Link>
                                        ) : (
                                            <>
                                                <img src={`http://127.0.0.1:8000/${j.image}`} alt={j.name} />
                                                <p>{j.name}</p>
                                            </>
                                        )}
                                    </div>
                                ))}
                                <div className="changeslide" onClick={(params) => scrollSlide(params, index, "next")}>
                                    <img src="/back.png" className="changeslideright" alt="" />
                                </div>
                            </div>
                        </div>
                        <div>
                            {+index === +len ? (
                                <div className="go_to_reg">
                                    <div className="go_to_reg_inner">
                                        <h2>There's even more to watch.</h2>
                                        <p>Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.</p>
                                        <NavLink to={"auth/register"}>
                                            <button className="nbutton">Join Now</button>
                                        </NavLink>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
