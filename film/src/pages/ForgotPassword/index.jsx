import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { forgotPasswordAPI } from "../../features/forgotPasswordAPI/forgotPasswordAPI";

export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, reset, handleSubmit } = useForm();

    const save = (data) => {
        dispatch(forgotPasswordAPI(data)).unwrap().then(navigate("/auth/email_send/"));
        reset();
    };

    return (
        <div className={styles.fp}>
            <div className={styles.fpInner}>
                <div className={styles.fpDiv}>
                    <h1 className={styles.blackText}>Update password, email or phone</h1>
                    <p className={styles.blackText}>How would you like to reset your password?</p>
                    <div className={styles.radio}>
                        <label className={styles.rpInp} htmlFor="html">
                            <input type="radio" name="email-sms" value="email" defaultChecked />
                            <p className={styles.blackText}>Email</p>
                        </label>
                        <label htmlFor="css" className={styles.rpInp}>
                            <input type="radio" id="css" name="email-sms" value="SMS" />
                            <p className={styles.blackText}>SMS</p>
                        </label>
                    </div>
                    <p className={styles.blackText}>We will send you an email with instructions on how to reset your password.</p>
                    <form className={styles.fpForm} onSubmit={handleSubmit(save)}>
                        <input
                            className={styles.fpInput}
                            type="email"
                            placeholder="name@example.com"
                            {...register("email", {
                                required: "Please enter your Email",
                            })}
                        />
                        <button className={styles.nbutton}>Email Me</button>
                    </form>
                    <Link className={styles.blackText}>I don't remember my email or phone.</Link>
                </div>
            </div>
        </div>
    );
};
