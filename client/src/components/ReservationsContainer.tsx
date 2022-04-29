import {useAppContext} from "../context/appContext";
import {useEffect} from "react";
import {Box, Paper, Typography} from "@mui/material";
import {Loader} from "./index";
import Reservation from "./Reservation";

export default function ReservationsContainer() {

    const {getReservations, reservations, isLoading, page, totalReservations} = useAppContext()
    useEffect(() => {
        getReservations()
    }, [])
    if (isLoading) {
        return <Paper><Loader/></Paper>
    }
    if (reservations.length === 0) {
        return (
            <Paper>
                <Typography>
                    No reservations found...
                </Typography>
            </Paper>
        )
    }
    return (
        <>
            <Typography color='secondary' sx={{ml: 1}}>
                {totalReservations} reservation {reservations.length > 1 && 's'} found
            </Typography>
            <Box component="div" sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>

                {reservations.map((reservation: any) => {
                    return (
                        <Reservation key={reservation._id} {...reservation}/>
                    )
                })}
            </Box>
            {/* pagination goes here! */}
        </>
    )
}