import { useRef, useState } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { registerCodeVerifyAPI } from "../../features/registerCodeVerification/registerCodeVerificationAPI";
import { useDispatch } from "react-redux";

export const RegisterVerify = () => {
    const inputsRef = useRef([]);
    const location = useLocation();
    const data = location.state;
    const dispatch = useDispatch()
    const [code_error, setCodeError] = useState('')
    const navigate = useNavigate()

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        if (value && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKey = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = inputsRef.current.map((input) => input.value).join("");
        const send = {verification_code: code, email: data}
        if (data) {            
            dispatch(registerCodeVerifyAPI(send)).unwrap()
            .catch(
                setCodeError("code-error")
            )
        }
    };

    return (
        <div className="verification-container">
            <form id="verification-form" onSubmit={handleSubmit}>
                <div>
                    <h1 className="blacktext">Let's confirm your account.</h1>
                    <p className="blacktext">You have received verification code to your email, please confirm it to start watching.</p>
                </div>
                <div className="code-inputs">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <input key={index} type="number" min={0} max={9} required className={`code-input ${code_error}`} ref={(el) => (inputsRef.current[index] = el)} onChange={(e) => handleInputChange(e, index)} onKeyDown={(e) => handleKey(e, index)} />
                    ))}
                </div>
                <button className="nbutton">Confirm</button>
            </form>
        </div>
    );
};
