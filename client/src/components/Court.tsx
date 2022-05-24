import {Ballot, SaveAs, Settings} from "@mui/icons-material";
import {Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import {deepPurple, green} from "@mui/material/colors";
import {format} from "date-fns";
import {useAppContext} from "../context/appContext";
import {Link} from "react-router-dom";

export default function Court({id, courtName, courtType, inService, updatedAt}: any) {

    const {setEditCourt, deleteCourt} = useAppContext()

    let date = format(new Date(updatedAt), 'MMM do, yyyy')
    let time = format(new Date(updatedAt), 'HH:mm:ss')

    return (
        <Card
            sx={{
                maxWidth: {xs: 325, md: 450},
                background: '#fff',
                m: {xs: 2, md: 5}
            }}
        >
            <CardContent>
                <Grid container spacing={{xs: 1, md: 3}} sx={{m: {xs: 0, md: 1}}}>
                    {/* title row */}
                    <Grid item xs={3} md={2}>
                        <Avatar
                            variant='square'
                            sx={{
                                bgcolor: courtType === 'tennis' ? deepPurple[800] : green[800],
                                borderRadius: '15%'
                            }}
                        >
                            {courtType[0].toUpperCase()}
                        </Avatar>
                    </Grid>
                    <Grid item xs={9} md={9}>
                        <Typography variant="h5" sx={{fontWeight: 700}} gutterBottom color="text.primary">
                            {courtName.toUpperCase()}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider variant="middle" sx={{mt: 2}}></Divider>
                <Grid container spacing={{xs: 1, md: 3}} sx={{m: {xs: 0, md: 1}}}>
                    {/* details row */}

                    <Grid item xs={6} md={5}>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                        >
                            <Ballot sx={{mr: 2}}/>
                            <Typography variant="subtitle1" color="text.secondary">
                                {courtType} court
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={5}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                        >
                            <Settings sx={{mr: 2}}/>
                            <Typography variant="subtitle1" color="text.secondary">
                                {inService}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Updated at row */}

                    <Grid item xs={6} md={5}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                        >
                            <SaveAs sx={{mr: 2}}/>
                            <Typography variant="subtitle1" color="text.secondary">
                                {date}
                            </Typography>
                        </Box>
                    </Grid>
                    {/*
                    <Grid item xs={6} md={5}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                        >
                            <AccessTimeFilled sx={{mr: 2}}/>
                            <Typography variant="subtitle1" color="text.secondary">
                                {time}
                            </Typography>
                        </Box>
                    </Grid>
                    */}

                    {/* buttons row */}

                    <Grid item xs={12} md={10}>
                        <Box component="div"
                             sx={{
                                 mt: 2,
                                 display: 'flex',
                                 justifyContent: 'center'
                             }}>
                            <Button
                                component={Link}
                                size='small'
                                variant="contained"
                                color="secondary"
                                sx={{mr: 2}}
                                to="/admin/add-court"
                                onClick={() => setEditCourt(id)}
                            >
                                Update
                            </Button>
                            <Button
                                size='small'
                                variant="contained"
                                color="error"
                                onClick={() => deleteCourt(id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}