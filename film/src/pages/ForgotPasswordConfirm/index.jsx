import { useForm } from "react-hook-form";
import "./style.css";
import { useDispatch } from "react-redux";
import { forgotPasswordChangeAPI } from "../../features/forgotPasswordChangeAPI/forgotPasswordChangeAPI";
import { useNavigate, useParams } from "react-router";

export const ForgotPasswordConfirm = () => {
    const {register, handleSubmit, reset, getValues, formState: { errors }} = useForm();
    const dispatch = useDispatch();
    const { uidb64, token } = useParams();
    const navigate = useNavigate();

    const save = (data) => {
        dispatch(forgotPasswordChangeAPI({ uidb64, token, password: data.password }))
            .unwrap()
            .then(navigate("/"));
        reset();
    };

    return (
        <div className="sp">
            <div className="sp-inner">
                <div className="sp-div">
                    <form className="sp-form" onSubmit={handleSubmit(save)}>
                        {errors.password && <p className="errormessage">{errors.password.message}</p>}
                        {errors.repassword && <p className="errormessage">{errors.repassword.message}</p>}
                        <label className="sp-label" htmlFor="password">
                            New Password
                        </label>
                        <input className="password" type="password" name="password" {...register("password", { required: "Password is required" })} />

                        <label className="sp-label" htmlFor="repassword">
                            Repeat New Password
                        </label>
                        <input
                            className="password"
                            type="password"
                            name="repassword"
                            {...register("repassword", {
                                required: "Repeat password is required",
                                validate: (value) => value === getValues("password") || "Passwords do not match",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                    message: "Password security chack hasn't passed"
                                }
                            })}
                        />

                        <button className="nbutton">Change</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
