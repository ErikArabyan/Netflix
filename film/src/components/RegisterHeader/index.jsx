import "./style.css";
import { NavLink } from "react-router-dom";

export const RegisterHeader = () => {
    return (
        <div className="register-header">
            <div className="register-header_inner">
                <div className="left">
                    <NavLink className="logolink">
                        <img className="register-logo" src="/netflix.png" alt="netflix logo" />
                    </NavLink>
                </div>
                <div className="right">
                    <NavLink to={"auth/login"}>
                        <button className="register-authLinks">Sign In</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
