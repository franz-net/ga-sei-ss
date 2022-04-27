import {AccessTimeFilled, Ballot, SaveAs, Settings} from "@mui/icons-material";
import {Avatar, Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {deepPurple, green} from "@mui/material/colors";
import {format} from "date-fns";

export default function Court({courtName, courtType, inService, updatedAt}: any) {

    let date = format(new Date(updatedAt), 'MMM do, yyyy')
    let time = format(new Date(updatedAt), 'HH:mm:ss')

    // @ts-ignore
    return (
        <Card
            sx={{
                maxWidth: {xs: 325, md: 615},
                background: 'rgba(255,255,255,1)',
                m: 5
            }}
        >
            <CardContent>
                <Grid container spacing={3} sx={{m: 1}}>
                    {/* title row */}
                    <Grid item xs={3} md={2}>
                        <Avatar
                            variant='square'
                            sx={{
                                bgcolor: courtType === 'tennis' ? deepPurple[800] : green[800]
                            }}
                        >
                            {courtType[0].toUpperCase()}
                        </Avatar>
                    </Grid>
                    <Grid item xs={9} md={10}>
                        <Typography variant="h5" sx={{fontWeight: 700}} gutterBottom color="text.primary">
                            {courtName.toUpperCase()}
                        </Typography>
                    </Grid>

                    {/* details row */}

                    <Grid item xs={6} md={6}>
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

                    <Grid item xs={6} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                        >
                            <Settings sx={{mr: 2}}/>
                            <Typography variant="subtitle1" color="text.secondary">
                                {inService ? 'Available' : 'Under Maintenance'}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Updated at row */}

                    <Grid item xs={6} md={6}>
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
                    <Grid item xs={6} md={6}>
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

                    {/* buttons row */}

                </Grid>
            </CardContent>
        </Card>
    )
}