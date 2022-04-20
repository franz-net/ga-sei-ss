import React from 'react';
import {Error, Landing, ProtectedRoute, Signup} from './pages';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Calendar, Dashboard, MasterLayout} from "./pages/authPages";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {green} from "@mui/material/colors";
import {CssBaseline} from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "Quicksand",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    },
    palette: {
        primary: green
    }
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <MasterLayout/>
                        </ProtectedRoute>
                    }>
                        <Route index element={<Dashboard/>}/>
                        <Route path='/calendar' element={<Calendar/>}/>
                    </Route>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/landing" element={<Landing/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
