import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {useAppContext} from "../../context/appContext";
import {useState} from "react";
import {ScreenMessage} from "../../components";
import {useNavigate} from "react-router-dom";


export default function Profile() {
    const navigate = useNavigate()
    // @ts-ignore
    const {user, isLoading, showAlert, displayAlert, updateUser} = useAppContext()

    const initialState = {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        password: ''
    }

    const [values, setValues] = useState(initialState)

    const handleChange = (e: any) => {
        console.log(values)
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = (e: any) => {
        console.log("HERE!!")
        e.preventDefault()
        const {name, lastName, email, password} = values
        console.log(values)
        if (!email || !lastName || !name) {
            displayAlert()
            return
        }
        const currentUser = {name, lastName, email, password}
        updateUser({currentUser, endPoint: 'user', alertText: 'Profile updated...'})
    }

    return (
        <Paper
            sx={{mt: 10}}
            elevation={8}
        >
            <Box
                sx={{
                    margin: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Typography variant="h6" gutterBottom>
                    Edit Profile
                </Typography>
                {showAlert && <ScreenMessage/>}
                <Box
                    component='form'
                    onSubmit={onSubmit} sx={{mt: 3}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='firstName'
                                name='name'
                                label='First Name'
                                fullWidth
                                variant='standard'
                                value={values.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                                value={values.lastName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                variant="standard"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="password"
                                label="New Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                variant='standard'
                                value={values.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
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