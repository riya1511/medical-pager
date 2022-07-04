import React from 'react';
import { Channel, useChatContext, MessageTeam } from 'stream-chat-react';
import CreateChannel from './CreateChannel';
import EditChannel from './EditChannel';
// import TeamMessage from './TeamMessage';
import ChannelInner from './ChannelInner';

function ChannelContainer({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) {
  const { channel } = useChatContext();

  if(isCreating){
    return(
      <div className='channel__container'>
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    )
  }

  if(isEditing){
    return (
      <div className='channel__container'>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    )
  }

  const EmptyState = () => (
    <div className='channel-empty__container'>
      <p className='channel-empty__first'>This the the beginning of your chat history</p>
      <p className='channel-empty__second'>Send messages, emojis, attachments, links and much more!</p>
    </div>
  )

  return (
    <div className='channel__container'>
      <Channel 
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  )
}

export default ChannelContainer