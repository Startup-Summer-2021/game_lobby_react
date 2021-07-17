import React, { useEffect, useState } from 'react';

export default function RoomPage({ room, name, roomsCollection }) {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const unsubscribe = roomsCollection
                            .doc(room.toString())
                            .onSnapshot((doc) => {
                                if (doc.exists) {
                                    let data = doc.data();
                                    let participants = data.participants;
                                    let host = data.host_name;
                                    let participantList = [];                               
                                    participantList.push((<li key={host} className="host"> {host}</li>))
                                    participants.forEach(p => participantList.push((<li key={p}>{p}</li>)));
                                    setParticipants(participantList);
                                }                                            
                            });
        return unsubscribe;
    }, [])

    return (
        <div className="room-page-container">
            <div>
                <h1>Room ID: {room}</h1>
                <ul>
                    {
                        participants
                    }
                </ul>
            </div>            
        </div>
    )
}

