import {Box, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import {LandingImageCard} from "./";
import Tennis from '../assets/imgs/landing_card_tennis.jpg';
import Padel from '../assets/imgs/landing_card_padel.jpg';
import {teal} from "@mui/material/colors";

const products = [
    {
        title: 'Tennis',
        price: '$150 p/h',
        description: [
            'Unlimited Players',
            'State of the art Tennis court'
        ],
        buttonText: 'Sign up to reserve',
        buttonVariant: 'outlined'
    },
    {
        title: 'Padel',
        subheader: 'Most Popular',
        price: '$250 p/h',
        description: [
            'Unlimited Players',
            'State of the art Padel court'
        ],
        buttonText: 'Sign up to reserve',
        buttonVariant: 'contained'
    },
    {
        title: 'Classes',
        price: 'Contact us',
        description: [
            'Top rated instructors',
            'Learn Tennis or Padel',
            'State of the art facilities'
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined'
    }
]


export default function LandingPrices({courtsRef}: any) {

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                
            }}
            ref={courtsRef}
        >
            <Container disableGutters maxWidth="sm" component="main" sx={{pt: 8, pb: 6}}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Pricing
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    We offer competitive rental prices and classes to take advantage of our amazing facilities
                </Typography>
            </Container>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {products.map((product)=>(
                        <Grid
                            item
                            key={product.title}
                            xs={12}
                            sm={product.title==='Classes'? 12: 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={product.title}
                                    subheader={product.subheader}
                                    titleTypographyProps={{align: 'center'}}
                                    action={product.title === 'Padel'? <StarIcon /> : null}
                                    subheaderTypographyProps={{align: 'center'}}
                                    sx={{
                                        backgroundColor: (theme)=>
                                        theme.palette.mode === 'light'? theme.palette.grey[200]:theme.palette.grey[700]
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2
                                        }}
                                    >
                                        <Typography component="h2" variant="h4" color="text.primary">
                                            {product.price}
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {product.description.map((line)=>(
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant={product.buttonVariant as 'outlined' | 'contained'}
                                    >
                                        {product.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </Box>
    )
}