import {useAppContext} from "../context/appContext";
import {Alert, Snackbar} from "@mui/material";

export default function ScreenMessage() {
    // @ts-ignore
    const {alertType, alertText} = useAppContext()

    // @ts-ignore
    return (
        <Snackbar>
            <Alert severity={alertType}>{alertText}</Alert>
        </Snackbar>
    )
}