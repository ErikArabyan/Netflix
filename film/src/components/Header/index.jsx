import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../../features/logoutAPI/logoutAPI";
import { setSearch } from "../../features/filmsAPI/filmSlice";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userAPI.user);
    const [show, setShow] = useState(true);
    const [search, setSearchStyle] = useState(false);
    const [token, setToken] = useState(true);

    const logout = () => {
        dispatch(logoutAPI())
            .unwrap()
            .then(() => {
                navigate("/auth/login/")
            });
    }

    const searchfunc = (data) => {
        dispatch(setSearch(data.target.value))
    }
    useEffect(()=>{
        if(localStorage.token){
            setToken(true)
        }else{
            setToken(false)
        }
    }, [])

    return (
        <header className={token || user?.username ? styles.loggedIn : styles.header}>
            <div className={styles.headerInner}>
                <div className={styles.left}>
                    <NavLink className={styles.logoLink}>
                        <img className={styles.logo} src="/netflix.png" height={35} alt="netflix logo" />
                        <img className={styles.logoSmall} src="/N.png" alt="netflix logo" />
                    </NavLink>
                </div>
                { token && user?.username ? (
                    <div className={styles.right}>
                        <input className={[styles.searchDefault, search ? styles.searchOpen : styles.searchClose].join(' ')} type="search" onChange={(data) => searchfunc(data)}/>
                        <button className={styles.searchButton}>
                            <img src="/search.png" className={styles.searchIcon} alt="" onClick={() => setSearchStyle(search ? false : true)} />
                        </button>
                        <div className={styles.profile} onClick={() => setShow(show ? false : true)}>
                            <img src={`http://127.0.0.1:8000${user.image}`}  className={styles.profileImage} alt="" />
                            <img src="/down-arrow.png" className={styles.drowdownArrow} alt="" />
                        </div>
                        <div onClick={() => setShow(show ? true : true)} className={[styles.dropdown, show ? [styles.show, styles.disable].join(' ') : ''].join(' ')}>
                            <div className={[styles.innertext, styles.cursor].join(' ')}>
                                <h4>{user.username}</h4>
                                <h4>Manage Profiles</h4>
                            </div>
                            <hr className={styles.line} />
                            <div className={[styles.innertext, styles.cursor].join(' ')}>
                                <h4>Account</h4>
                                <h4>Help Center</h4>
                                <h4 onClick={logout}>Sign out of Netflix</h4>
                            </div>
                        </div>
                    </div>
                ) :token?<></>: (
                    <div className={styles.right}>
                        <p className={styles.headerText}>UNLIMITED TV SHOWS & MOVIES</p>
                        <NavLink to={"/auth/register/"}>
                            <button className='nbutton'>Join Now</button>
                        </NavLink>
                        <NavLink to={"/auth/login/"}>
                            <button className={styles.authLinks}>Sign In</button>
                        </NavLink>
                    </div>
                )}
            </div>
        </header>
    );
};
