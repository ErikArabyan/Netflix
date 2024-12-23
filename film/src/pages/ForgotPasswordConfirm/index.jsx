import { useForm } from "react-hook-form";
import styles from "./style.module.css";
import { useDispatch } from "react-redux";
import { forgotPasswordChangeAPI } from "../../features/forgotPasswordChangeAPI/forgotPasswordChangeAPI";
import { useNavigate, useParams } from "react-router";

export const ForgotPasswordConfirm = () => {
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();
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
        <div className={styles.sp}>
            <div className={styles.spInner}>
                <div className={styles.spDiv}>
                    <header>
                        <h1 className={styles.heading}>Reset Your Password</h1>
                    </header>
                    <form className={styles.spForm} onSubmit={handleSubmit(save)}>
                        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
                        {errors.repassword && <p className={styles.errorMessage}>{errors.repassword.message}</p>}
                        <label className={styles.spLabel} htmlFor="password">
                            New Password
                        </label>
                        <input className='blacktext' type="password" name="password" {...register("password", { required: "Password is required" })} />

                        <label className={styles.spLabel} htmlFor="repassword">
                            Repeat New Password
                        </label>
                        <input
                            className='blacktext'
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

                        <button className='nbutton'>Change</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
