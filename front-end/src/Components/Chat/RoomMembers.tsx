import { useEffect, useState, } from "react";


export default function RoomMembers() {

    const [members, setMembers] = useState();


    useEffect( () => {    
        let url : string = "http://localhost:4000/users";
        fetch(url)
        .then(response => response.json())
        .then(data =>  setMembers(data));
    }, []
    )

}