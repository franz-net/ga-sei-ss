import {useAppContext} from "../context/appContext";
import {useEffect} from "react";
import {Loader} from "./index";
import {Grid, Paper, Typography} from "@mui/material";
import Court from "./Court";

export default function CourtsContainer() {

    const {getCourts, courts, isLoading, page, totalCourts} = useAppContext()

    useEffect(() => {
        getCourts()
    }, [])

    if (isLoading) {
        return <Paper><Loader/></Paper>
    }

    if (courts.length === 0) {
        return (
            <Paper>
                <Typography>
                    No Courts to display...
                </Typography>
            </Paper>
        )
    }
    return (
        <>
            <Typography>
                {totalCourts} courts {courts.length > 1 && 's'} found
            </Typography>
            <Grid container spacing={2}>

                {courts.map((court: any) => {
                    return (
                        <Grid item key={court._id} xs={12} md={6}>
                            <Court {...court}/>
                        </Grid>
                    )

                })}
            </Grid>
            {/* pagination goes here! */}
        </>
    )
}