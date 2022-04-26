import {Box} from "@mui/material";
import {LandingImageCard} from "./";
import Tennis from '../assets/imgs/landing_card_tennis.jpg';
import Padel from '../assets/imgs/landing_card_padel.jpg';

const courts = [
    {
        title: 'Tennis',
        description: 'Reserve a Tennis court to play in one of our 3 state of the art courts or sign up for our Tennis clinic with one of our amazing instructors',
        img: {Tennis}
    },
    {
        title: 'Padel',
        description: 'Play the incredible fun and blazing fast sport in one of our 2 professional courts. If you are new to the sport, you can take a beginners class to get ready for the big matches!',
        img: {Padel}
    }
]

export default function LandingCourts() {

    return (
        <Box
            component="div"
            sx={{
                minHeight: '100vh'
            }}
        >
            <LandingImageCard court={courts[0]}/>
            <LandingImageCard court={courts[1]}/>
        </Box>
    )
}