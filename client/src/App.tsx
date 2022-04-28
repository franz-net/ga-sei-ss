import React from 'react';
import {Landing, NotFoundError, ProtectedRoute, Signup} from './pages';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AddCourt, AddReservation, Courts, Dashboard, MasterLayout, Profile, Reservations} from "./pages/authPages";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";

// @ts-ignore
const theme = createTheme({
    typography: {
        fontFamily: "Quicksand",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    },
    palette: {
        primary: {
            main: '#66bb6a',
            light: '#a5d6a7',
            dark: '#1b5e20'
        },
        secondary: {
            main: '#ff6d00',
            light: '#ff8a33',
            dark: '#b24c00',
            contrastText: 'rgba(0, 0, 0, 0.87)'
        }
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
                        {/* Roles: [user, admin, instructor] */}
                        <Route index element={<Dashboard/>}/>
                        <Route path='/reservations' element={<Reservations/>}/>
                        <Route path='/add-reservation' element={<AddReservation/>}/>
                        <Route path='/profile' element={<Profile/>}/>

                        {/* Roles: [admin] */}
                        <Route path='/admin/courts' element={<Courts/>}/>
                        <Route path='/admin/add-court' element={<AddCourt/>}/>
                        {/*
                        <Route path='/admin/users' element={<Reservations/>}/>
                        <Route path='/admin/stats' element={<Stats/>}/>
                        */}

                    </Route>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/landing" element={<Landing/>}/>
                    <Route path="*" element={<NotFoundError/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
