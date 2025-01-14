import { createBrowserRouter, useNavigate } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { RegisterLayout } from "../pages/RegisterLayout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Error } from "../pages/Error";
import { Register } from "../pages/Register";
import { ForgotPassword } from "../pages/ForgotPassword";
import { ForgotPasswordConfirm } from "../pages/ForgotPasswordConfirm";
import { EmailSend } from "../pages/EmailSend";
import { FilmDetails } from "../pages/FilmDetails";
import { useSelector } from "react-redux";
import { RegisterVerify } from "../pages/RegisterVerify";
import { LoginByQR } from "../pages/LoginByQr";
import { QRLoading } from "../pages/QRLoading"
import { Camera } from "./Camera";


const NoAuth = ({ children }) => {
    const user = useSelector((state) => state?.userAPI);
    const navigate = useNavigate();
    if (user?.username) {
        navigate(-1);
    }
    return user?.username ? <Home /> : children;
};

const Auth = ({ children }) => {
    const { user } = useSelector((state) => state.userAPI.user);
    return user?.username ? children : <Home />;
};

export const urlPatterns = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "load/:SessionId/",
                element: <QRLoading />,
            },
            {
                path: "auth/login",
                element: (
                    <NoAuth>
                        <Login />
                    </NoAuth>
                ),
            },
            {
                path: "film/:id/:filmname/",
                element: (
                    <Auth>
                        <FilmDetails />
                    </Auth>
                ),
            },
            {
                path: "auth/login-by-qr",
                element: (
                    <NoAuth>
                        <LoginByQR />
                    </NoAuth>
                ),
            },
            {
                path: "*",
                element: <Error />,
            },
        ],
    },
    {
        path: "/",
        element: <RegisterLayout />,
        children: [
            {
                path: "auth/register",
                element: (
                    < NoAuth >
                        <Register />
                    </ NoAuth>
                ),
            },
            {
                path: "auth/register/verification-code/",
                element: (
                    < NoAuth >
                        <RegisterVerify />,
                    </ NoAuth>
                ),
            },
            {
                path: "auth/forgot-password",
                element: (
                    <NoAuth>
                        <ForgotPassword />
                    </NoAuth>
                ),
            },
            {
                path: "auth/reset/:uidb64/:token/",
                element: (
                    <NoAuth>
                        <ForgotPasswordConfirm />
                    </NoAuth>
                ),
            },
            {
                path: "auth/email_send/",
                element: (
                    <NoAuth>
                        <EmailSend />
                    </NoAuth>
                ),
            },
        ],
    },
    {
        path: "camera/",
        element: (
            // <Auth>
                <Camera/>
            // </Auth>
        )
    }
]);