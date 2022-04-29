import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {ScreenMessage} from "../../components";
import {useAppContext} from "../../context/appContext";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {add} from "date-fns";

export default function AddReservation() {

    const {
        isLoading,
        isEditing,
        courtId,
        date,
        duration,
        courts,
        timezone,
        reservationCourtType,
        displayAlert,
        showAlert,
        createReservation,
        handleReservationChange,
        editReservation,
        clearReservationValues,
        getCourts,
        //reservations, - This will be used later to determine if a court is available at that time.
        courtTypeOptions
    } = useAppContext()

    console.log(duration.toString())

    useEffect(() => {
        getCourts()
    }, [])

    const [filteredCourts, setFilteredCourts] = useState<any>(courts)


    useEffect(() => {

        setFilteredCourts(courts.filter((court: any) => {
            return court.courtType === reservationCourtType && court.inService
        }))
    }, [reservationCourtType])

    const navigate = useNavigate()

    const onSubmit = (e: any) => {
        e.preventDefault()
        if (!date || !courtId || !duration) {
            displayAlert()
            return
        }
        if (isEditing) {
            editReservation()

            navigate('/admin/reservations')
            return

        }
        createReservation()
    }


    return (
        <Paper
            sx={{}}
            elevation={8}
        >
            <Box
                sx={{
                    margin: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Typography variant="h5" gutterBottom sx={{mt: 4}}>
                    {isEditing ? 'Edit Reservation' : 'New Reservation Entry'}
                </Typography>
                {showAlert && <ScreenMessage/>}
                <Box
                    component='form'
                    onSubmit={onSubmit} sx={{mt: 3}}>
                    <Grid container spacing={3}>
                        {/* time-picker */}
                        <Grid item xs={9} md={8}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    disablePast
                                    renderInput={(params) => <TextField name='date' {...params}/>}
                                    value={date}
                                    label="Reservation Date"
                                    onChange={(e: any, value: any) => {
                                        handleReservationChange({
                                            name: 'date',
                                            value: value
                                        })
                                        handleReservationChange({
                                            name: 'timezone',
                                            value: Intl.DateTimeFormat().resolvedOptions().timeZone
                                        })
                                    }}
                                    maxDate={add(new Date(), {days: 2})}
                                    minTime={new Date(0, 0, 0, 6, 0)}
                                    maxTime={new Date(0, 0, 0, 22, 0)}
                                    minutesStep={30}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={9} md={8}>
                            <FormControl>
                                <FormLabel id="duration">Duration</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="duration"

                                    value={duration.toString()}
                                    name="duration"
                                    onChange={(e) => {
                                        handleReservationChange({
                                            name: 'duration',
                                            value: +e.target.value
                                        })
                                    }}

                                >
                                    <FormControlLabel control={<Radio/>} value="1" label="1 hour"/>
                                    <FormControlLabel control={<Radio/>} value="2" label="2 hour"/>
                                    <FormControlLabel control={<Radio/>} value="3" label="3 hour"/>

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {/* Court type picker */}
                        <Grid item xs={9} md={5}>
                            {/* @ts-ignore*/}
                            <FormControl fullWidth>
                                <InputLabel id='courtTypeSelect'>Court Type</InputLabel>
                                <Select
                                    labelId='courtTypeSelect'
                                    label='Court Type'
                                    value={reservationCourtType}
                                    onChange={(e: any) => handleReservationChange({
                                        name: 'reservationCourtType',
                                        value: e.target.value
                                    })}

                                >
                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                    {
                                        courtTypeOptions.length >= 1
                                            ? courtTypeOptions.map((courtType: any, i: number) => {
                                                return (
                                                    <MenuItem key={i} value={courtType}>{courtType}</MenuItem>
                                                )
                                            })
                                            : <MenuItem value=""> <em>None</em> </MenuItem>
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Court Picker */}
                        <Grid item xs={9} md={5}>
                            {/* @ts-ignore*/}
                            <FormControl fullWidth>
                                <InputLabel id='courtTypeSelect'>Court</InputLabel>
                                <Select
                                    value={courtId}
                                    labelId='Court'
                                    label="Available Courts"
                                    onChange={(e: any) => handleReservationChange({
                                        name: 'courtId',
                                        value: e.target.value
                                    })}
                                >
                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                    {filteredCourts.map((court: any, i: number) => {
                                        return (
                                            <MenuItem key={i} value={court._id}>{court.courtName}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={5}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 4}}
                                disabled={isLoading}
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 4}}
                                onClick={(e) => {
                                    e.preventDefault()
                                    clearReservationValues()
                                }}
                            >
                                Clear
                            </Button>
                        </Grid>

                    </Grid>

                </Box>

            </Box>
        </Paper>
    )
}