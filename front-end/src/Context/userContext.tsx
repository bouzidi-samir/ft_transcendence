import React, { createContext, useState} from "react";

const UserContext = createContext<any>({
    id: "",
    username: "",
    nickname: "",
    registred: "false",
    avatar_url: "",
    status: "",
    //setUserContext: (propertie:any, info: any) => {  
     //},    
})

const UserContextProvider = (children: any) => {
    const userProfilState = {
        id: "",
        username: "",
        nickname: "",
        avatar_url: "",
        status: "",    
    }
    const [userProfil, setuserProfil] = useState(userProfilState);  
}

export default UserContext;