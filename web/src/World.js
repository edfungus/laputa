import React, { useEffect } from 'react';
import socketIOClient from "socket.io-client";
import Display from './Display';
const server = "http://localhost:3000"

function World() {
    // Create socket connection
    useEffect(() => {
        const socket = socketIOClient(server);
        socket.on("connect", data => {
            console.log(data);
        })
    }, []);

    return (<Display />);
}

export default World;
