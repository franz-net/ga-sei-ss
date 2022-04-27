import {AppBar, Box, Button, Collapse, IconButton, Toolbar, Typography} from "@mui/material";
import {ExpandMore, Sort} from "@mui/icons-material";
import {orange} from "@mui/material/colors";
import {useEffect, useState} from "react";
import SportsTennisSharpIcon from "@mui/icons-material/SportsTennisSharp";

export default function LandingHeader() {
    const [collapsed, setCollapsed] = useState(false)
    useEffect(() => {
        setCollapsed(true)
    }, [])

    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
            }}
            id="landingHeader"
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
                            component="span"
                            display="inline"
                            sx={{
                                typography: {xs: 'h5', md: 'h3'},
                                color: orange['A700']
                            }}
                        >
                            Studio.
                        </Typography>
                    </Typography>
                    <Button
                        variant="contained"
                        href="/signup"
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            mr: 3
                        }}
                        endIcon={<SportsTennisSharpIcon fontSize="small"/>}
                    >
                        Login
                    </Button>
                    <IconButton
                        sx={{
                            display: {xs: 'block', md: 'none'}
                        }}
                    >
                        <Sort sx={{color: '#fff'}} fontSize="large"
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Collapse in={collapsed} {...(collapsed ? {timeout: 1500} : {})} collapsedSize={50}>
                <Box component="div" sx={{textAlign: 'center'}}>
                    <Typography
                        sx={{
                            typography: {xs: 'h4', md: 'h2'},
                            color: '#fff',
                        }}
                    >
                        Game, set & match
                    </Typography>
                    <IconButton size='large'>
                        <ExpandMore
                            sx={{
                                color: orange['A700'],
                                fontSize: '4rem'
                            }}
                        />
                    </IconButton>
                </Box>
            </Collapse>
        </Box>
    )
}