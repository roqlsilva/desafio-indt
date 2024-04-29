import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login";

export const SignRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={LoginPage} />
            </Routes>
        </BrowserRouter>
    );
};