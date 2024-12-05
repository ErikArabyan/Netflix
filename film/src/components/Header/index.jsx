import { useState } from "react";
import "./style.css";
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
        <div className={`${user?.username ? "logged-in" : "header"}`}>
            <div className="header_inner">
                <div className="left">
                    <NavLink>
                        <img className="logo" src="/netflix.png" alt="netflix logo" />
                    </NavLink>
                </div>
                {user?.username ? (
                    <div className="right">
                        <img src="/search.png" className="search_icon" alt="" />
                        <div className="profile" onClick={() => setShow(show === "" ? "show" : "")}>
                            <img src={`http://127.0.0.1:8000${user.image}`} className="profile_image" alt="" />
                            <img src="/down-arrow.png" className="drowdown_arrow" alt="" />
                        </div>
                        <div onClick={() => setShow(show === "show" ? "show" : "show")} className={`dropdown ${show}`}>
                            <div className="innertext">
                                <h4>{user.username}</h4>
                                <h4>Manage Profiles</h4>
                            </div>
                            <hr className="line" />
                            <div className="innertext">
                                <h4>Account</h4>
                                <h4>Help Center</h4>
                                <h4 onClick={logout}>Sign out of Netflix</h4>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="right">
                        <p className="header_text">UNLIMITED TV SHOWS & MOVIES</p>
                        <NavLink to={"/auth/register"}>
                            <button className="nbutton">Join Now</button>
                        </NavLink>
                        <NavLink to={"/auth/login"}>
                            <button className="authLinks">Sign In</button>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};
