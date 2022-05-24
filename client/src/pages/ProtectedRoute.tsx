import {useAppContext} from "../context/appContext";
import {Navigate} from "react-router-dom";

type ProtectedRouteProps = {
    children: JSX.Element
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const {user} = useAppContext()
    if (!user) {
        return <Navigate to="/landing"/>
    }
    return (
        children
    )
}