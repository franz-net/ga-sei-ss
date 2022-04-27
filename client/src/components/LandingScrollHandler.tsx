import {useScrollTrigger} from "@mui/material";
import React from "react";

export default function LandingScrollHandler(props: any) {
    const {children} = props
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,

    })
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        sx: trigger ? {background: '#303030'} : {background: 'none'}
    })
}