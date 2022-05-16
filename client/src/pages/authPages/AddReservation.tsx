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
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {add, formatISO, parseISO} from "date-fns";

export default function AddReservation() {
    const navigate = useNavigate()
    const {
        isLoading,
        isEditing,
        courtId,
        date,
        duration,
        courts,
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

    useEffect(() => {
        getCourts()
    }, [])

    const [filteredCourts, setFilteredCourts] = useState<any>(courts)

    useEffect(() => {
        console.log(courts)
        setFilteredCourts(courts.filter((court: any) => {
            return court.courtType === reservationCourtType && court.inService
        }))
    }, [reservationCourtType, courts])


    const handleTimeChange = (value: any) => {
        let newDate = `${formatISO(date, {representation: 'date'})}T${formatISO(value, {representation: 'time'})}`
        handleReservationChange({
            name: 'date',
            value: parseISO(newDate)
        })
    }
    const onSubmit = (e: any) => {
        e.preventDefault()
        if (!date || !courtId || !duration) {
            console.log(date, courtId, duration)
            console.log("error here!")
            displayAlert()
            return
        }
        if (isEditing) {
            editReservation()

            navigate('/')
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
                    onSubmit={onSubmit}
                    sx={{mt: 3, display: 'flex', flexWrap: 'wrap', gap: '1em', justifyItems: 'center', ml: 6}}>

                    {/* time-picker */}
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disablePast
                                renderInput={(params) => <TextField name='date' {...params}/>}
                                value={
                                    new Date(
                                        Date.UTC(
                                            new Date(date).getFullYear(),
                                            new Date(date).getMonth(),
                                            new Date(date).getDate(),
                                            new Date(date).getHours(),
                                            new Date(date).getMinutes(),
                                            new Date(date).getSeconds()
                                        ))}
                                label="Reservation Date"
                                onChange={(value: any) => {
                                    handleReservationChange({
                                        name: 'date',
                                        value: value
                                    })
                                }}
                                maxDate={add(new Date(), {days: 2})}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                            <TimePicker

                                renderInput={(params) => <TextField name='date' {...params}/>}
                                value={new Date(date)}
                                label="Reservation Time"
                                onChange={(value: any) => {

                                    console.log(value)
                                    handleTimeChange(value)
                                }}
                                minTime={new Date(0, 0, 0, 6, 0)}
                                maxTime={new Date(0, 0, 0, 22, 0)}
                                minutesStep={30}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <FormControl>
                            <FormLabel id="duration">Duration</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="duration"
                                value={duration}
                                name="duration"
                                onChange={(e) => {
                                    handleReservationChange({
                                        name: 'duration',
                                        value: +e.target.value
                                    })
                                }}

                            >
                                <FormControlLabel control={<Radio/>} value={1} label="1 hour"/>
                                <FormControlLabel control={<Radio/>} value={2} label="2 hour"/>
                                <FormControlLabel control={<Radio/>} value={3} label="3 hour"/>

                            </RadioGroup>
                        </FormControl>
                    </Box>


                    {/* Court type picker */}
                    <Grid container spacing={3} sx={{}}>
                        <Grid item xs={5}>
                            {/* @ts-ignore*/}
                            <FormControl fullWidth>
                                <InputLabel id='courtTypeSelect'>Court Type</InputLabel>
                                <Select
                                    labelId='courtTypeSelect'
                                    label='Court Type'
                                    value={reservationCourtType}
                                    onChange={(e: any) => {
                                        handleReservationChange({
                                            name: 'reservationCourtType',
                                            value: e.target.value
                                        })
                                        handleReservationChange({
                                            name: 'courtId',
                                            value: ''
                                        })
                                    }}

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
                        <Grid item xs={5}>
                            {/* @ts-ignore*/}
                            <FormControl fullWidth>
                                <InputLabel id='courtTypeSelect'>Court</InputLabel>
                                <Select
                                    value={courtId}
                                    labelId='Court'
                                    label="Court"
                                    onChange={(e: any) => handleReservationChange({
                                        name: 'courtId',
                                        value: e.target.value
                                    })}
                                >
                                    {filteredCourts.length > 0
                                        ? filteredCourts.map((court: any, i: number) => {
                                            return (
                                                <MenuItem key={i} value={court.id}>{court.courtName}</MenuItem>
                                            )
                                        })
                                        : <MenuItem value=""> <em>None</em> </MenuItem>}
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