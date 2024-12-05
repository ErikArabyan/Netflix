import { Outlet } from "react-router-dom";
import { Pageload } from "../../components/Pageload";

export const MainLayout = () => {
    return (
        <div>
            <Pageload/>
            <Outlet/>
        </div>
    );
};