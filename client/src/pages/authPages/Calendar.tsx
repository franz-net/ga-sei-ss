import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {CalendarPicker, LocalizationProvider} from "@mui/x-date-pickers";
import {useEffect, useState} from "react";

export default function Calendar() {
    const [date, setDate] = useState<any>(new Date())
    useEffect(() => {
        console.log(JSON.stringify(date))
    }, [date])
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)}/>
        </LocalizationProvider>
    )
}