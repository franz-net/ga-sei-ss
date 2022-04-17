import {useState} from "react";
import {Avatar, Box, Button, Container, CssBaseline, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAppContext} from "../context/appContext";
import {useNavigate} from "react-router-dom";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: false
}


export default function Signup() {
    // @ts-ignore
    const theme = createTheme();
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
            setupUser({currentUser, endPoint: 'login', alertText: 'Login Successful! Redirecting...'})
        } else {
            setupUser({currentUser, endPoint: 'register', alertText: 'User Created! Redirecting...'})
        }
    }

    return (
        <ThemeProvider theme={theme}>
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
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={onSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
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
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end" sx={{mb: 3}}>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}