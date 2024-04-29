import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";

export const OtherRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home} />
            </Routes>
        </BrowserRouter>
    );
};