import {useAppContext} from "../context/appContext";
import {Alert, Snackbar} from "@mui/material";
import {useState} from "react";

export default function ScreenMessage() {
    // @ts-ignore
    const {alertType, alertText} = useAppContext()
    const [open, setOpen] = useState(false)

    // @ts-ignore
    // @ts-ignore
    return (
        <Snackbar autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert severity={alertType}>{alertText}</Alert>
        </Snackbar>
    )
}