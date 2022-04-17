import {useAppContext} from "../context/appContext";
import {Alert, Snackbar} from "@mui/material";

// @ts-ignore
export default function ScreenMessage() {
    // @ts-ignore
    const {alertType, alertText, showAlert} = useAppContext()

    return (
        <Snackbar autoHideDuration={6000} open={showAlert} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert severity={alertType}>{alertText}</Alert>
        </Snackbar>
    )
}