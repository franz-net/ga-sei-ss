import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {CalendarPicker, LocalizationProvider} from "@mui/x-date-pickers";
import {useEffect, useState} from "react";
import {Paper} from "@mui/material";

export default function Calendar() {
    const [date, setDate] = useState<any>(new Date())
    useEffect(() => {
        console.log(JSON.stringify(date))
    }, [date])
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper>
                <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)}/>
                {date.toString()}
            </Paper>
        </LocalizationProvider>
    )
}