import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
  } from "react-router-dom";
import firebase from 'firebase';
import RoomPage from './pages/roomPage';

import Button from './components/button';
import Input from './components/input';

const ACTIONS = {
    CREATE: 1,
    JOIN: 2
}

const firebaseConfig = {
    apiKey: "AIzaSyCv5U8Mlr0jrca39dIW9Rbs1yTyvuNLZVY",
    authDomain: "game-lobby-790fb.firebaseapp.com",
    projectId: "game-lobby-790fb",
    storageBucket: "game-lobby-790fb.appspot.com",
    messagingSenderId: "925627531411",
    appId: "1:925627531411:web:e1f98394fdd99527ff0d66"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const roomsCollection = db.collection('Rooms');

function App() {
    const [action, setAction] = useState(null);
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    async function onSubmitName() {
        if (action === ACTIONS.CREATE) {
            const { serverTimestamp } = firebase.firestore.FieldValue;
            let room_id = Math.floor(Math.random() * 100000);
            setRoom(room_id);

            await roomsCollection.doc(room_id.toString()).set({
                host_name: name,
                participants: [],
                createdAt: serverTimestamp()
            });
            return true;
        } else {
            let docRef = roomsCollection.doc(room.toString());
            let docInstance = await docRef.get();
            if (docInstance.exists) {
                let docData = docInstance.data();
                await docRef.update({ participants: [...docData.participants, name] });
                return true;
            }            
        }

        return false;
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <ChooseOption setAction={setAction} />
                </Route>
                <Route path="/enterRoom">
                   {action ? <EnterRoom room={room} onchange={(e) => setRoom(e.target.value)} /> : <Redirect to="/" />}
                </Route>
                <Route path="/enterName">
                    {action ? <EnterName name={name} onchange={(e) => setName(e.target.value)} onclick={onSubmitName} /> : <Redirect to="/" />}
                </Route>                     
                <Route path="/room">
                    {action && name && room ? <RoomPage room={room} name={name} roomsCollection={roomsCollection} /> : <Redirect to="/" />}
                </Route>                   
            </Switch>
        </Router>
    )
}

function ChooseOption({ setAction }) {
    return (
        <div className="main-container">
            <div>
                <div className="main-text-container">
                    <a href="#" className="main-text">ICE Racer</a>
                </div>
                <Link to={"/enterName"} >
                    <Button text={"Create Room"} onclick={() => setAction(ACTIONS.CREATE)} />
                </Link>
                <br />
                <Link to={"/enterRoom"}>
                    <Button text={"Join Room"} onclick={() => setAction(ACTIONS.JOIN)} />
                </Link>
            </div>            
        </div>
    )
}


function EnterName({ name, onchange, onclick }) {
    const history = useHistory();
    return (
        <div className="main-container">
            <div>
                <h1>Enter Your Name</h1>
                <Input value={name} onchange={onchange} />
                <Button text={"Next"} onclick={() => {
                    if (onclick()) {
                        history.push("/room")
                    }                
                }} />   
            </div>             
        </div>
    )
}

function EnterRoom({ room, onchange }) {
    return (
        <div className="main-container">
            <div>
                <h1>Enter Room ID</h1>
                <Input value={room} onchange={onchange} />
                <Link to={"/enterName"} >
                    <Button text={"Next"} />
                </Link>
            </div>            
        </div>
    )
}

export default App
