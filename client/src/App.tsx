import React from 'react';
import {Error, Landing, Signup} from './pages'
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>Welcome!</h1>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/landing" element={<Landing/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    );
}
