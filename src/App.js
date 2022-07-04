import React, { useState } from "react";
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from "universal-cookie";
import ChannelContainer from "./Components/ChannelContainer";
import ChannelListContainer from "./Components/ChannelListContainer";
import Auth from "./Components/Auth";

import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();
const apiKey = '7ap97ae7b75j';
const authToken = cookies.get('token');

const client = StreamChat.getInstance(apiKey);

if(authToken){
  client.connectUser({
    id: cookies.get('userID'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNo: cookies.get('phoneNo')
  }, authToken);
}


function App() {
  const [createType , setCreateType] = useState('');
  const [isCreating , setIsCreating] = useState(false);
  const [isEditing , setIsEditing] = useState(false);

  if(!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}

export default App;
