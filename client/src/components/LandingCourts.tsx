import {Box} from "@mui/material";
import {LandingImageCard} from "./";
import tennisCourt from '../assets/imgs/landing_card_tennis.jpg';

const courts = [
    {
        title: 'Tennis',
        description: 'Reserve a Tennis court to play in one of our 3 state of the art courts or sign up for our Tennis clinic with one of our amazing instructors',
        img: {tennisCourt}
    }
]

export default function LandingCourts() {
    return (
        <Box
            component="div"
            sx={{
                height: '100vh'
            }}
        >
            <LandingImageCard court={courts[0]}/>

        </Box>
    )
}