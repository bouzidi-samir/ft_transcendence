import React, { createContext, useState} from "react";

const UserContext = createContext<any>({
    id: "",
    username: "",
    avatar_url: "",
    status: "",
   // setUserContext: (info: any) => { },    
})

const UserContextProvider = (children: any) => {
    const userProfilState = {
        id: "",
        username: "",
        avatar_url: "",
        status: "",    
    }
    const [userProfil, setuserProfil] = useState(userProfilState);  
}

export default UserContext;