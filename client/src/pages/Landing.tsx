import {Box} from "@mui/material";
import tennisBackground from '../assets/imgs/tennis-court.png';
import {LandingCourts, LandingHeader} from "../components";
import {useRef} from "react";
import Footer from "../components/Footer";

export default function Landing() {
    const courtsRef = useRef<null | HTMLDivElement>(null)

    function handleScrollClick() {
        if (courtsRef && courtsRef.current) {
            courtsRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }

    return (
        <Box>
            <Box
                component="div"
                sx={{
                    minHeight: '100vh',
                    width: '100vw',
                    maxWidth: '100%',
                    backgroundImage: `url(${tennisBackground})`,
                    backgroundColor: '#303030',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top'
                }}
            >
                <LandingHeader handleScrollClick={handleScrollClick}/>
            </Box>
            <LandingCourts courtsRef={courtsRef}/>
            <Footer/>
        </Box>
    )
}