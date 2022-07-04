import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';
import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';

const cookies = new Cookies();

const SideBar = ({ logout }) => {
    return (
        <div className='channel-list__sidebar'>
            <div className='channel-list__sidebar__icon1'>
                <div className='icon1__inner'>
                    <img src={HospitalIcon} alt='Hospital' width='30' />
                </div>
            </div>
            <div className='channel-list__sidebar__icon1'>
                <div className='icon1__inner' onClick={logout}>
                    <img src={LogoutIcon} alt='Logout' width='30' />
                </div>
            </div>
        </div>
    )
}

const CompanyHeader = () => {
    return (
        <div className='channel-list__header'>
            <p className='channel-list__header__text'>Medical Pager</p>
        </div>
    )
} 

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

function ChannelListContent({ isCreating, setIsCreating, setCreateType, setIsEditing,setToggleContainer }) {

    const { client } = useChatContext();

    const logout = () => {
        cookies.remove('token');
        cookies.remove('userID');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNo');

        window.location.reload();
    }

    const filters = {members: { $in: [client.userID] }} ;

  return (
    <>
        <SideBar logout={logout} />
        <div className='channel-list__list__wrapper'>
            <CompanyHeader />
            <ChannelSearch setToggleContainer={setToggleContainer} />
            <ChannelList 
                filters={filters}
                channelRenderFilterFn={customChannelTeamFilter}
                List={(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type='team'
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview
                        {...previewProps}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                        type='team'
                    />
                )}
            />
             <ChannelList 
                filters={filters}
                channelRenderFilterFn={customChannelMessagingFilter}
                List={(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type='messaging'
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview
                        {...previewProps}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                        type='messaging'
                    />
                )}
            />
        </div>
    </>
  )
}

const ChannelListContainer = ({ setIsCreating, setCreateType, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className='channel-list__container'>
                <ChannelListContent 
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
            </div>

            <div className='channel-list__container-responsive'
             style={{ left: toggleContainer ? '0%' : '-89%', backgroundColor: '#005fff'}}>
                <div className='channel-list__container-toggle' onClick={() => setToggleContainer(prev => !prev)} />
                <ChannelListContent 
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    )
}

export default ChannelListContainer