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
import {ScreenMessage} from "../../components";


export default function AddCourt() {
    const {
        isLoading,
        courtTypeOptions,
        inServiceOptions,
        displayAlert,
        showAlert,
        createCourt,
        courtName,
        courtType,
        inService,
        isEditing,
        handleCourtChange
    } = useAppContext()

    const handleInput = (e: any) => {
        const name = e.target.name
        let value: any
        if (name === 'inService') {
            value = e.target.value === 'true'
        } else {
            value = e.target.value
        }
        handleCourtChange({name, value})
    }


    const onSubmit = (e: any) => {
        e.preventDefault()
        if (!courtName || !inService || !courtType) {
            displayAlert()
            return
        }
        createCourt()
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
                    {isEditing ? 'Edit Court' : 'New Court Entry'}
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
                                onChange={handleInput}
                                autoComplete="off"
                                value={courtName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel id="courtType-group">Court Type</FormLabel>
                                <RadioGroup
                                    aria-labelledby="courtType-group"
                                    name="courtType"
                                    onChange={handleInput}
                                    value={courtType}
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