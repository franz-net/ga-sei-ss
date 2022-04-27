import {Box, IconButton, Typography} from "@mui/material";
import {GitHub, LinkedIn, SportsBaseball} from "@mui/icons-material";
import {lime} from "@mui/material/colors";

export default function Footer() {
    return (
        <Box component="footer" sx={{
            paddingTop: '30px',
            paddingBottom: '30px',
            display: 'flex',
            justifyContent: 'center',
            alightItems: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            background: '#303030'
        }}>
            <Typography color='#fff' sx={{typography: {xs: 'h6', md: 'h5'}}}>
                Created with
                <Typography component="span" color={lime[500]}>
                    &nbsp;<SportsBaseball fontSize="medium"/>&nbsp;
                </Typography>
                by Franz
            </Typography>

            <Box
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    mt: 1,
                    mb: 1,
                    color: '#fff'
                }}
            >
                <IconButton href="https://github.com/franz-net/" target="_blank">
                    <GitHub fontSize="large" sx={{color: lime[500]}}/>
                </IconButton>
                <IconButton href="https://www.linkedin.com/in/franzramirez/" target="_blank">
                    <LinkedIn fontSize="large" sx={{color: lime[500]}}/>
                </IconButton>
            </Box>
        </Box>
    )
}