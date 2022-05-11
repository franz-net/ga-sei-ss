import {useAppContext} from "../context/appContext";
import {useEffect} from "react";
import {Loader} from "./index";
import {Box, Paper, Typography} from "@mui/material";
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
            <Typography color='secondary' sx={{ml: 1}}>
                {totalCourts} court {courts.length > 1 && 's'} found
            </Typography>
            <Box component="div" sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>

                {courts.map((court: any) => {
                    return (
                        <Court key={court.id} {...court}/>
                    )

                })}
            </Box>
            {/* pagination goes here! */}
        </>
    )
}