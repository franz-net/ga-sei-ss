import {useAppContext} from "../context/appContext";
import {Navigate} from "react-router-dom";

// @ts-ignore
export default function ProtectedRoute({children}) {
    // @ts-ignore
    const {user} = useAppContext()
    if (!user) {
        return <Navigate to="/landing"/>
    }
    return (
        children
    )
}