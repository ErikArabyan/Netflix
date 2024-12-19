import { useState } from "react";
import styles from "./style.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../../features/logoutAPI/logoutAPI";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.userAPI.user);        
    const [show, setShow] = useState("show");

    function logout() {
        dispatch(logoutAPI())
            .unwrap()
            .then(() => {
                navigate("/auth/login/")
            });
    }

    return (
        <div className={user?.username ? styles.loggedIn : styles.header}>
            <div className={styles.headerInner}>
                <div className={styles.left}>
                    <NavLink>
                        <img className={styles.logo} src="/netflix.png" alt="netflix logo" />
                    </NavLink>
                </div>
                {user?.username ? (
                    <div className={styles.right}>
                        <img src="/search.png" className={styles.searchIcon} alt="" />
                        <div className={styles.profile} onClick={() => setShow(show === "" ? "show" : "")}>
                            <img src={`http://127.0.0.1:8000${user.image}`} className={styles.profileImage} alt="" />
                            <img src="/down-arrow.png" className={styles.drowdownArrow} alt="" />
                        </div>
                        <div onClick={() => setShow(show === "show" ? "show" : "show")} className={[styles.dropdown, show ? styles.show : ''].join(' ')}>
                            <div className={styles.innertext}>
                                <h4>{user.username}</h4>
                                <h4>Manage Profiles</h4>
                            </div>
                            <hr className={styles.line} />
                            <div className={styles.innertext}>
                                <h4>Account</h4>
                                <h4>Help Center</h4>
                                <h4 onClick={logout}>Sign out of Netflix</h4>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.right}>
                        <p className={styles.headerText}>UNLIMITED TV SHOWS & MOVIES</p>
                        <NavLink to={"/auth/register"}>
                            <button className='nbutton'>Join Now</button>
                        </NavLink>
                        <NavLink to={"/auth/login"}>
                            <button className={styles.authLinks}>Sign In</button>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};
