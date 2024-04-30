import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages/Home/Dashboard";
import { UrlListPage } from "../pages/Home/Url";

export const OtherRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={DashboardPage} />
                <Route path="/url" Component={UrlListPage} />
            </Routes>
        </BrowserRouter>
    );
};