import { useDispatch } from "react-redux";
import { PageLoad } from "../../components/PageLoad"
import { useEffect } from "react";
import { qrAPI } from "../../features/qrAPI/qrAPI";
import { useParams } from "react-router-dom";

export const QRLoading = () => {
    const dispatch = useDispatch()
    const {SessionId} = useParams()
    

    useEffect(() => {
        dispatch(qrAPI(SessionId))
    }, [SessionId, dispatch])
    return (
        <div>
            <PageLoad/>
        </div>
    );
};