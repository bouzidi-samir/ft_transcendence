import '../styles/Components/Messages.css'


export default function Messages() {

    return (
        <div className="messages-content">
            <div className='room-title'>
                <h2>Nom de la room</h2>
            </div>
            <div className="conversation"></div>
            <div className="send-zone">
            <input></input>
            <button className="btn btn-primary" >Envoyer</button>
        </div>
    </div>
    );
}