import { useSelector } from "react-redux";

export default function NewMessage(props: any) {

    const User = useSelector((state: any) => state.User);
    const message = props.message;
    let bubleStyle : {bullDirection : any, bullColor : string};
    let avatar : string;
    console.log(message);
    if (message.fromUsername === User.username) { 
        bubleStyle = {bullDirection: "start", bullColor : "blueviolet"};
        avatar = User.avatar_url;
    }
    else {
        bubleStyle = {bullDirection: "end", bullColor : "coral"};
        avatar = message.fromAvatar;
    }
    return (
        <div key={message.index} className="buble-zone" style={{justifyContent: bubleStyle.bullDirection}}>
            <img src={avatar} className="avatar-buble"></img>   
            <div key={message.index} className="message-bubleA" style={{backgroundColor: bubleStyle.bullColor}}
                > 
                <span>{message.fromNickname} ({message.time}) :</span>
                <p className="buble-text">{message.text}</p> 
            </div>
        </div>
    )
}