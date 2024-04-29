import React, { useEffect, useState } from "react";
import { SignRoutes } from "./SignRoutes";
import { OtherRoutes } from "./OtherRoutes";
import { usePersistentStorageValue } from "../hooks/usePersistentStorageValue";
import { LoginResponseType } from "../models/auth/login.interface";

export const Routes: React.FC = () => {
    const [loggedUser, setLoggedUser] = usePersistentStorageValue<LoginResponseType>("auth");
    const [signed, setSigned] = useState<boolean>(false);
    
    useEffect(() => {
        console.log("csacsa", loggedUser);
        if (loggedUser) {
            setSigned(true);
        } else {
            setSigned(false);
        }
    }, [loggedUser]);

    return signed ? <OtherRoutes /> : <SignRoutes />
};