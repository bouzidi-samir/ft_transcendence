import { useDispatch } from "react-redux";



 async function UpdateRoomList() {
    
    const dispatch = useDispatch();

    console.log("test");
    let url = `http://localhost:4000/chat/rooms`;
    let response = await fetch(url).then(ret => ret.json()) 
    dispatch({type: "Roomlist/setRoomlist",payload: response,})
}

export {UpdateRoomList};