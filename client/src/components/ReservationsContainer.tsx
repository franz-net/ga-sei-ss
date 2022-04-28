import {useAppContext} from "../context/appContext";
import {useEffect} from "react";
import {Grid, Paper, Typography} from "@mui/material";
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
            <Typography>
                {totalReservations} reservation {reservations.length > 1 && 's'} found
            </Typography>
            <Grid container spacing={2}>

                {reservations.map((reservation: any) => {
                    return (
                        <Grid item key={reservation._id} xs={12} md={6}>
                            <Reservation {...reservation}/>
                        </Grid>
                    )

                })}
            </Grid>
            {/* pagination goes here! */}
        </>
    )
}