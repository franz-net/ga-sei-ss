import {Box} from "@mui/material";
import tennisBackground from '../assets/imgs/tennis-court.png';
import {LandingCourts, LandingHeader} from "../components";

export default function Landing() {
    return (
        <Box
            component="div"
            sx={{
                minHeight: '100vh',
                backgroundImage: `url(${tennisBackground})`,
                backgroundColor: '#303030',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'top'
            }}
        >
            <LandingHeader/>
            <LandingCourts/>
            {/*
            <Container>
                <Typography
                    sx={{
                        typography: {xs: 'h5', md: 'h2'},
                        color: 'commonWhite'
                    }}
                    variant="h2"
                    color="commonWhite"
                >
                    Come play and learn in our state of the art Tennis and Padel Courts
                </Typography>
                <Button
                    variant="contained"
                    href="/signup"
                    endIcon={<SportsTennisSharpIcon fontSize="small"/>}
                >
                    Sign up | Login
                </Button>

            </Container>
            */}
        </Box>
    )
}