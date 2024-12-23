import { Outlet } from "react-router-dom";
import { RegisterHeader } from "../../components/RegisterHeader";

export const RegisterLayout = () => {
    return (
        <div>
            <RegisterHeader />
            <main>
                <Outlet />
            </main>
        </div>
    );
};