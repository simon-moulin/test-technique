import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Action, Credit } from '../types';

const SERVER_URL = 'http://localhost:3000';
const useWebSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [queue, setQueue] = useState<Action[]>([]);
    const [credits, setCredits] = useState<Credit[]>([]);

    useEffect(() => {
        const newSocket = io(SERVER_URL);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        newSocket.on('updateQueue', (data: Action[]) => {
            console.log('update queue', data)
            setQueue(data);
        });

        newSocket.on('updateCredits', (data: Credit[]) => {
            console.log('update credits', data)
            setCredits(data);
        });

        setSocket(newSocket);

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    return { socket, queue, credits };
};

export default useWebSocket;
