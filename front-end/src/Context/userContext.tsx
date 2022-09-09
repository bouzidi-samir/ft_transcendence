import React, { createContext, useState} from "react";

const UserContext = createContext<any>({
    id: "",
    username: "",
    nickname: "",
    registred:"",
    avatar_url: "",
    status: "",
    //setUserContext: (propertie:any, info: any) => {  
     //},    
})

export default UserContext;