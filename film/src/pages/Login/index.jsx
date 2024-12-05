import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useDispatch } from "react-redux";
import { loginAPI } from "../../features/loginAPI/loginAPI";
import { setLoading } from "../../features/loading/loading";
import { useState } from "react";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [caught, setcaugth] = useState("");
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();

    const save = (data) => {
        dispatch(setLoading(""));
        dispatch(loginAPI(data))
            .unwrap()
            .then(() => {
                navigate("/");
                dispatch(setLoading("hide"));
            })
            .catch(() => {
                setcaugth("Login or password are incorrect");
                dispatch(setLoading("hide"));
            });
        reset();
    };

    return (
        <div className="login">
            <div className="inner">
                <form className="innerform" onSubmit={handleSubmit(save)}>
                    {caught ? <h3 className="caught">{caught}</h3> : <></>}
                    <h1>Sign In</h1>
                    <input
                        type="email"
                        id="email"
                        className={`login-input ${errors.email ? "invalid" : ""}`}
                        placeholder=""
                        {...register("email", {
                            required: "please enter your email",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    <label className="login-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={`login-input ${errors.email ? "invalid" : ""}`}
                        type="password"
                        placeholder=""
                        {...register("password", {
                            required: "please enter your password",
                            // pattern: {
                            //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                            //     message: 'Invalid email address'
                            // }
                        })}
                    />
                    <label className="login-label" htmlFor="email">
                        Password
                    </label>
                    <button className="nbutton">Login</button>
                    <Link to={"/auth/forgot-password/"}>Forgot password?</Link>
                    <p>
                        New to Netflix? <Link to={"/auth/register/"}>Sign up now</Link>.
                    </p>
                </form>
            </div>
        </div>
    );
};