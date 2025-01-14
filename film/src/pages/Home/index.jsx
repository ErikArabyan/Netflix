import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { useEffect, useRef } from "react";
import { filmsAPI } from "../../features/filmsAPI/filmsAPI";
import { Link, NavLink } from "react-router-dom";
import { userAPI } from "../../features/userAPI/userAPI";
import { useStringContext } from "../..";

export const Home = () => {
    const user = useSelector((state) => state.userAPI.user);
    const { backend } = useStringContext()
    const { genres } = useSelector((state) => state.filmsAPI);
    const { films } = useSelector((state) => state.filmsAPI);
    const len = genres?.length - 1;
    const slideRef = useRef([]);
    const dispatch = useDispatch();
    const scrollby = window.innerWidth - 40;

    useEffect(() => {
        dispatch(filmsAPI())
            .unwrap()
            .then(() => {
                setTimeout(() => {
                    for (let i of slideRef.current) {
                        if (+i?.scrollWidth < +window.innerWidth) {
                            i.children[i.children.length - 1].children[0].classList.add(styles.hide);
                        }
                    }
                }, 20);
            });
        if (document.cookie.includes('token=')) {
            dispatch(userAPI());
        }
    }, [dispatch]);

    const scrollSlide = (params, index, direction) => {
        const container = slideRef.current[index];
        if (!container) return;
        const scrollAmount = direction === "prev" ? -scrollby : scrollby;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        if (container.scrollLeft - scrollby <= 0 && direction === "prev") {
            params.target.classList.add(styles.hide);
        }
        if (container.scrollLeft + scrollby * 2 >= container.scrollWidth && direction === "next") {
            params.target.classList.add(styles.hide);
        }
        if (direction === "prev" && container.scrollLeft + scrollby * 2 >= container.scrollWidth) {
            container.children[container.children.length - 1].children[0].classList.remove(styles.hide);
        }
        if (direction === "next" && container.scrollLeft >= 0) {
            container.children[0].children[0].classList.remove(styles.hide);
        }
    };

    return (
        <div>
            <div className={styles.homeText}>
                <header>
                    <h1 className={styles.heading}>Movies</h1>
                </header>
                <p className={styles.headingText}>Movies move us like nothing else can, whether they're scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.</p>
            </div>
            {genres ? genres.map((i, index) => {
                const filteredFilms = films.filter((j) => j.genres.includes(i));
                if (filteredFilms.length === 0) {
                    return null;
                }
                return (
                    <section key={index} className={styles.filmSection}>
                        <div className={[styles.movies, +index === +len && !user ? styles.blured : ""].join(" ")}>
                            <header>
                                <h2 className={styles.block}>{i}</h2>
                            </header>
                            <div className={[styles.filmgenre, +index === +len && !user ? styles.disableOverflow : ''].join(' ')} ref={(el) => (slideRef.current[index] = el)}>
                                <div className={styles.changeslide} onClick={(params) => scrollSlide(params, index, "prev")}>
                                    <img src="/back.png" className={[styles.changeslideleft, styles.hide].join(" ")} alt="" width={20} height={20} />
                                </div>
                                {filteredFilms.map((j, filmindex) => (
                                    <article key={filmindex}>
                                        {user?.user?.username ? (
                                            <Link className={styles.filmlink} to={`film/${j.id}/${j.name.split(" ").join('_')}`}>
                                                <img src={`${backend}${j.image}`} alt={j.name} width={299} height={168} />
                                                <p>{j.name}</p>
                                            </Link>
                                        ) : (
                                            <>
                                                <img src={`${backend}${j.image}`} alt={j.name} width={299} height={168} />
                                                <p>{j.name}</p>
                                            </>
                                        )}
                                    </article>
                                ))}
                                <div className={[styles.changeslide, +index === +len && !user ? styles.hide : ''].join(' ')} onClick={(params) => scrollSlide(params, index, "next")}>
                                    <img src="/back.png" className={styles.changeslideright} alt="" width={20} height={20} />
                                </div>
                            </div>
                        </div>
                        {+index === +len && !user ? (
                            <div className={styles.goToReg}>
                                <div className={styles.goToRegInner}>
                                    <h2>There's even more to watch.</h2>
                                    <p>Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.</p>
                                    <NavLink to={"auth/register"}>
                                        <button className='nbutton'>Join Now</button>
                                    </NavLink>
                                </div>
                            </div>
                        )
                            :
                            <></>
                        }
                    </section>
                );
            })
                :
                <></>
            }
        </div>
    );
};
