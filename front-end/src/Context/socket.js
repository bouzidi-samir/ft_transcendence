import React from 'react';
// import socketio from "socket.io-client";

import { io, Socket } from 'socket.io-client';
const {hostname} = document.location;

// export const socket = socketio.connect('http://localhost:8000');
export const socket = io(`http://${hostname}:8000`);
export const SocketContext = React.createContext();