import {Autocomplete, Box, Grid, Paper, TextField, Typography} from "@mui/material";
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
        courts,
        displayAlert,
        showAlert,
        createReservation,
        handleReservationChange,
        editReservation,
        clearReservationValues,
        getCourts,
        reservations,
        courtTypeOptions
    } = useAppContext()

    const [courtType, setCourtType] = useState<string>('tennis')
    const [filteredCourts, setFilteredCourts] = useState<any>(null)

    useEffect(() => {
        getCourts()
    }, [])


    useEffect(() => {
        //output the filtered courts
        console.log(courtType)
        setFilteredCourts(courts.filter((court: any) => {
            return court.courtType === courtType
        }))
    }, [courtType])


    const navigate = useNavigate()

    const handleDateInput = (date: any) => {
        handleReservationChange({name: 'date', value: date})
    }

    const handleInput = (e: any) => {
        console.log(e)
        const name = e.target.name
        let value = e.target.value

        handleReservationChange({name, value})
    }


    const onSubmit = (e: any) => {
        e.preventDefault()
        if (!date || !courtId) {
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
                        <Grid item xs={9} md={8}>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    disablePast
                                    renderInput={(params) => <TextField name='date' {...params}/>}
                                    value={date}
                                    label="Reservation Date"
                                    onChange={handleDateInput}
                                    maxDate={add(new Date(), {days: 2})}
                                    minTime={new Date(0, 0, 0, 6, 0)}
                                    maxTime={new Date(0, 0, 0, 22, 0)}
                                    minutesStep={30}
                                />
                            </LocalizationProvider>

                        </Grid>

                        <Grid item xs={9} md={8}>
                            {/* @ts-ignore*/}
                            <Autocomplete
                                value={courtType}
                                fullWidth
                                options={courtTypeOptions}
                                renderInput={(params) => <TextField {...params} label="Court Type"/>}
                                onChange={(e: any, value: any) => {
                                    setCourtType(value)
                                }}
                            >
                            </Autocomplete>
                        </Grid>
                        {/*
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel id="inService-group">In Service</FormLabel>
                                <RadioGroup
                                    aria-labelledby="inService-group"
                                    name="inService"
                                    onChange={handleInput}
                                    value={inService}
                                >
                                    {inServiceOptions.map((opt: string, index: number) => {
                                        return (
                                            <FormControlLabel key={index} value={opt} control={<Radio/>} label={opt}/>
                                        )
                                    })}
                                </RadioGroup>
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
                        */}
                    </Grid>

                </Box>

            </Box>
        </Paper>
    )
}