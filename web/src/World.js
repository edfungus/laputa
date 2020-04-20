import React, { useEffect } from 'react';
import { w3cwebsocket } from "websocket";
import Display from './Display';
const server = "ws://localhost:8080"

function World() {
    // Create socket connection
    useEffect(() => {
        const client = new w3cwebsocket(server);
        client.onopen = () => {
            console.log("We are connected!");
        }
        client.onclose = () => {
            console.log("Connection closed. Goodbye!");
        }
        client.onmessage = (message) => {
            console.log(message);
        }
    }, []);

    return (<Display />);
}

export default World;
