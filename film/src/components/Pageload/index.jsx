// import { useEffect } from "react";
import "./Style.css";

export const Pageload = ({isloading}) => {
    // useEffect(() => {}, [])
    // let style = document.createElement('style');
    // style.textContent = '* { overflow: none; }';
    // document.head.appendChild(style);
    // style?.parentNode?.removeChild(style)
    return (
        <div className={`pageload ${isloading}`}>
            <div className="redline1"></div>
            <div className="redline2"></div>
            <div className="redline3"></div>
        </div>
    );
};
