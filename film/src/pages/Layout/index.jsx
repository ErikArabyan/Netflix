import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export const Layout = () => {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Header/>
            <Outlet/>
        </div>
    );
};