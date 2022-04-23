import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {useAppContext} from "../../context/appContext";
import {useState} from "react";
import {ScreenMessage} from "../../components";

const initialState = {
    courtName: '',
    courtType: 'tennis',
    inService: 'true',
}

export default function AddCourt() {
    // @ts-ignore
    const {isLoading, courtTypeOptions, inServiceOptions, displayAlert, showAlert, createCourt} = useAppContext()

    const [values, setValues] = useState(initialState)

    const handleChange = (e: any) => {
        setValues({...initialState, [e.target.name]: e.target.value})
    }


    const onSubmit = (e: any) => {
        e.preventDefault()
        const {courtName, courtType} = values
        const inService = values.inService === 'true'
        if (!courtName || !inService || !courtType) {
            displayAlert()
            return
        }
        const newCourt = {courtName, courtType, inService}

        createCourt({newCourt})

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
                    New Court Entry
                </Typography>
                {showAlert && <ScreenMessage/>}
                <Box
                    component='form'
                    onSubmit={onSubmit} sx={{mt: 3}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id='courtName'
                                name='courtName'
                                label='Court Name | Number'
                                fullWidth
                                variant='standard'
                                onChange={handleChange}
                                autoComplete="off"
                                value={values.courtName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel id="courtType-group">Court Type</FormLabel>
                                <RadioGroup
                                    aria-labelledby="courtType-group"
                                    name="courtType"
                                    onChange={handleChange}
                                    value={values.courtType}
                                >
                                    {courtTypeOptions.map((opt: string, index: number) => {
                                        return (
                                            <FormControlLabel key={index} value={opt} control={<Radio/>} label={opt}/>
                                        )
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel id="inService-group">In Service</FormLabel>
                                <RadioGroup
                                    aria-labelledby="inService-group"
                                    name="inService"
                                    onChange={handleChange}
                                    value={values.inService}
                                >
                                    {inServiceOptions.map((opt: string, index: number) => {
                                        return (
                                            <FormControlLabel key={index} value={opt} control={<Radio/>} label={opt}/>
                                        )
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
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
                    </Grid>
                </Box>
            </Box>
        </Paper>
    )
}