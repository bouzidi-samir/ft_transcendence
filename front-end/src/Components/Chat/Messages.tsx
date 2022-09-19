import '../../styles/Components/Messages.css'
import React, { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function Messages({messages}: any) {

    return (
        <div className="messages-content">
            <div className='room-title'>
                <h2>Nom de la room</h2>
            </div>
            <div className="conversation">
            {messages.map((message: string, index: number) => (  
                    <div>     
                         <div>{message}</div>
                    </div>
                ))}
            </div>
            <div className="send-zone">
            <input></input>
            <button className="btn btn-primary" >Envoyer</button>
        </div>
    </div>
    );
}