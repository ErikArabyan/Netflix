import { NavLink } from "react-router-dom";
import "./style.css";

export const Error = () => {
    return (
        <div className="error">
            <div className="blur"></div>
            <div className="error-inner">
                <div className="top">
                    <h1>Lost your way?</h1>
                    <br />
                    <p>Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                    <button className="error-button">
                        <NavLink className='error-link' to={""}>Netflix Home</NavLink>
                    </button>
                </div>
                <div className="bottom">
                    <span className="error-code">
                        Error Code <strong>NSES-404</strong>
                    </span>
                </div>
            </div>
            <span className="image-source">
                FROM <strong>LOST IN SPACE</strong>
            </span>
        </div>
    );
};
