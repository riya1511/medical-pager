import React, {useState} from 'react';
import { useChatContext } from 'stream-chat-react';
import { CloseCreateChannel } from '../assets/CloseCreateChannel';
import UserList from './UserList';

const ChannelNameInput = ({ channelName = '' , setChannelName }) => {

  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value);
  }

  return(
     <div className='channel-name-input__wrapper'>
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder='channel-name' />
      <p>Add Members</p>
     </div>
  )
}

function CreateChannel({ createType, setIsCreating }) {
  const { client, setActiveChannel } = useChatContext();
  const [channelName, setChannelName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

  const create = async (event) => {
    event.preventDefault();
    if (!selectedUsers?.length) return;

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName, members: selectedUsers
      });
      await newChannel.watch();

      console.log(client.channel);

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID] || '');
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='create-channel__container'>
      <div className='create-channel__header'>
        <p>{createType === 'team' ? "Create a new channel" : "Send a direct message"}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className='create-channel__button-wrapper' onClick={create}>
        <p>{createType === 'team' ? 'Create Channel' : 'Create Megssage Group'}</p>
      </div>
    </div>
  )
}

export default CreateChannel