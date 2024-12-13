import { useForm } from "react-hook-form";
import styles from "./style.module.css";
import { registerAPI } from "../../features/registerAPI/registerAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const save = (data) => {
        dispatch(registerAPI(data))
            .unwrap()
            .then(navigate("/auth/register/verification-code/", { state: data.email }));
        reset();
    };

    return (
        <div className={styles.registrationMain}>
            <div className={styles.registrationInner}>
                <h1 className={styles.blacktext}>Create a password to start your membership</h1>
                <p className={styles.blacktext}>Just a few more steps and you're done! We hate paperwork, too.</p>
                <form autoComplete="on" className={styles.register} onSubmit={handleSubmit(save)}>
                    <input
                        type="first_name"
                        id="first_name"
                        name="first_name"
                        autoComplete="first_name"
                        className={styles.registrationInputs}
                        required
                        {...register("first_name", {
                            required: "Please enter your first_name",
                        })}
                    />
                    <label htmlFor="first_name">First name</label>
                    <input
                        type="last_name"
                        id="last_name"
                        name="last_name"
                        autoComplete="last_name"
                        className={styles.registrationInputs}
                        required
                        {...register("last_name", {
                            required: "Please enter your last_name",
                        })}
                    />
                    <label htmlFor="last_name">Last name</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        className={styles.registrationInputs}
                        required
                        {...register("email", {
                            required: "Please enter your email",
                        })}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="password"
                        className={styles.registrationInputs}
                        required
                        {...register("password", {
                            required: "Please enter your password",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                message: "Password security chack hasn't passed",
                            },
                        })}
                    />
                    <label htmlFor="password">Password</label>
                    <button type="submit" className='nbutton'>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};
