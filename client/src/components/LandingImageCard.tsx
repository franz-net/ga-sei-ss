import * as React from 'react';
import {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";


const cardVariants = {
    visible: {opacity: 1, transition: {duration: 1}},
    hidden: {opacity: 0, transition: {duration: 1}}
}

export default function LandingImageCard({court, checkedAnimation}: any) {
    const controls = useAnimation()
    const [ref, inView] = useInView()

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }
    }, [controls, inView])

    return (

        <Card
            component={motion.div}
            ref={ref}
            variants={cardVariants}
            animate={controls}
            transition={{ease: "easeOut", duration: 2}}
            initial="hidden"
            sx={{
                maxWidth: {xs: 345, md: 645},
                background: 'rgba(0,0,0,0.5)',
                m: 5
            }}
        >
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