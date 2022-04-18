import React from 'react';
import {Error, Landing, ProtectedRoute, Signup} from './pages'
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Calendar, MasterLayout} from "./pages/authPages";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme();

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <MasterLayout/>
                        </ProtectedRoute>
                    }>
                        <Route index element={<Calendar/>}/>
                    </Route>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/landing" element={<Landing/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
