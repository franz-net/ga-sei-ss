import {useEffect, useState} from "react";
import {Avatar, Box, Button, Container, CssBaseline, Grid, Paper, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FingerprintTwoToneIcon from '@mui/icons-material/FingerprintTwoTone';
import {useAppContext} from "../context/appContext";
import {useNavigate} from "react-router-dom";
import {ScreenMessage} from "../components";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: false
}

export default function Signup() {
    const [values, setValues] = useState(initialState)

    const navigate = useNavigate()

    // @ts-ignore
    const {user, isLoading, showAlert, displayAlert, setupUser} = useAppContext()

    const handleChange = (e: any) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        const {name, email, password, isMember} = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        const currentUser = {name, email, password}
        if (isMember) {
            setupUser({currentUser, endPoint: 'auth/login', alertText: 'Login Successful! Redirecting...'})
        } else {
            setupUser({currentUser, endPoint: 'user', alertText: 'User Created! Redirecting...'})
        }
    }

    useEffect(() => {

        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember})
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Paper sx={{marginTop: 10}} elevation={12}>
                <Box
                    sx={{
                        margin: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 2, bgcolor: 'secondary.main'}}>
                        {values.isMember ?
                            <FingerprintTwoToneIcon/> :
                            <LockOutlinedIcon/>
                        }
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {values.isMember ? "Login" : "Sign Up"}
                    </Typography>

                    {showAlert && <ScreenMessage/>}
                    <Box component="form" noValidate onSubmit={onSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            {!values.isMember && (
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="email"
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    value={values.password}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onSubmit={onSubmit}
                        >
                            {values.isMember ? 'Login' : 'Create Account'}
                        </Button>
                        <Grid container justifyContent="flex-end" sx={{mb: 3}}>
                            <Grid item>
                                {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                                <Button variant="text" onClick={toggleMember}>
                                    {values.isMember ? 'Register' : 'Login'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}