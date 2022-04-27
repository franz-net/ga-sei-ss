import {Box, Typography} from "@mui/material";
import {LandingImageCard} from "./";
import Tennis from '../assets/imgs/landing_card_tennis.jpg';
import Padel from '../assets/imgs/landing_card_padel.jpg';
import {teal} from "@mui/material/colors";

const courts = [
    {
        title: 'Tennis',
        description: 'Reserve a Tennis court to play in one of our 3 state of the art courts or sign up for our Tennis clinic with one of our amazing instructors and become more competitive in your matches!',
        img: {Tennis}
    },
    {
        title: 'Padel',
        description: 'Play the incredible fun and blazing fast sport in one of our 2 professional courts. If you are new to the sport, you can take a beginners class to get ready for the big matches!',
        img: {Padel}
    }
]


export default function LandingCourts({courtsRef}: any) {

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: teal[50],
            }}
            ref={courtsRef}
        >
            <Typography
                variant="h4"
                sx={{
                    typography: {xs: 'h6', md: 'h4'},
                    margin: 8,
                    textAlign: 'center'
                }}
            >
                We are a sports complex and academy focused on racket sports, where we attempt to develop and form
                players of all ages.
            </Typography>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <LandingImageCard court={courts[0]}/>
                <LandingImageCard court={courts[1]}/>
            </Box>
        </Box>
    )
}