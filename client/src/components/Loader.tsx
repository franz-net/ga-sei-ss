import {Box} from "@mui/material";
import {motion} from "framer-motion";
import {SportsBaseball} from "@mui/icons-material";
import {lime} from "@mui/material/colors";

const loaderVariants = {
    animationOne: {
        x: [-20, 20],
        y: [0, -30],
        rotate: -80,
        transition: {
            x: {type: 'spring', repeat: Infinity, repeatType: 'reverse', duration: 0.5},
            y: {repeat: Infinity, repeatType: 'reverse', duration: 0.25, ease: 'easeOut'},
            rotate: {type: 'bounce', repeat: Infinity, repeatType: 'reverse', duration: 0.5}
        }
    }
}

export default function Loader() {

    return (
        <Box
            component='div'
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1300000,
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <Box component={motion.div}
                 variants={loaderVariants}
                 animate="animationOne"

                 sx={{
                     width: '4rem',
                     height: '4rem',
                     margin: '40px',
                     borderRadius: '50%',
                     background: '#000'
                 }}
            >
                <SportsBaseball sx={{
                    fontSize: '4rem',
                    color: lime[500]
                }}/>
            </Box>
        </Box>
    )
}