import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {Sort} from "@mui/icons-material";
import {orange} from "@mui/material/colors";

export default function LandingHeader() {
    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <AppBar
                sx={{
                    background: 'none',
                    fontWeight: 'fontWeightBold'
                }}
                elevation={0}
            >
                <Toolbar
                    sx={{
                        width: '80%',
                        margin: '0 auto'
                    }}
                >
                    <Typography
                        sx={{
                            typography: {xs: 'h5', md: 'h3'},
                            flexGrow: '1'
                        }}>
                        Smash
                        <Typography
                            display="inline"
                            sx={{
                                typography: {xs: 'h5', md: 'h3'},
                                color: orange['A700']
                            }}
                        >
                            Studio.
                        </Typography>
                    </Typography>
                    <IconButton>
                        <Sort
                            sx={{
                                color: '#fff'
                            }}
                            fontSize="large"
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="div"
                sx={{
                    textAlign: 'center'
                }}
            >
                <Typography
                    sx={{
                        typography: {xs: 'h4', md: 'h2'},
                        color: '#fff',

                    }}
                >
                    Game, set & match
                </Typography>
            </Box>
        </Box>
    )
}