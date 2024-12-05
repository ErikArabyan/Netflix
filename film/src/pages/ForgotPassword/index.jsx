import "./style.css";
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
        <div className="fp">
            <div className="fp-inner">
                <div className="fp-div">
                    <h1 className="black-text">Update password, email or phone</h1>
                    <p className="black-text">How would you like to reset your password?</p>
                    <div className="radio">
                        <label className="rp-inp" htmlFor="html">
                            <input type="radio" name="email-sms" value="email" defaultChecked />
                            <p className="black-text">Email</p>
                        </label>
                        <label htmlFor="css" className="rp-inp">
                            <input type="radio" id="css" name="email-sms" value="SMS" />
                            <p className="black-text">SMS</p>
                        </label>
                    </div>
                    <p className="black-text">We will send you an email with instructions on how to reset your password.</p>
                    <form className="fp-form" onSubmit={handleSubmit(save)}>
                        <input
                            className="fp-input"
                            type="email"
                            placeholder="name@example.com"
                            {...register("email", {
                                required: "Please enter your Email",
                            })}
                        />
                        <button className="nbutton">Email Me</button>
                    </form>
                    <Link className="black-text">I don't remember my email or phone.</Link>
                </div>
            </div>
        </div>
    );
};
