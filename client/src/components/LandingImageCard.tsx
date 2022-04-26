import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function LandingImageCard({court}: any) {
    return (
        <Card sx={{
            maxWidth: {xs: 345, md: 645},
            background: 'rgba(0,0,0,0.5)'

        }}>
            <CardMedia
                component="img"
                alt="tennis courts"
                height="420"
                image={court.img[court.title]}
                sx={{
                    height: {xs: 320, md: 420}
                }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div"
                            sx={{
                                fontWeight: 'fontWeightBold',
                                color: '#fff'
                            }}>
                    {court.title}
                </Typography>
                <Typography variant="body1" color="text.secondary"
                            sx={{
                                color: '#fff'
                            }}>
                    {court.description}
                </Typography>
            </CardContent>
        </Card>
    );
}