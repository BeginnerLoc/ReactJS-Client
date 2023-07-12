import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import ChatMessageBox from './ChatMessageBox';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

const ChatBot = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const chatBotContainerStyle = {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 9999,
  };

  const avatarStyle = {
    backgroundColor: isHovered ? colors.blueAccent[700] : 'rgba(142, 192, 232, 0.4)', // Replace with your preferred color
    transition: 'transform 0.3s', // Add transition for smooth effect
    transform: isHovered ? 'scale(1.2)' : 'scale(1)', // Scale up the Avatar on hover
  };

  return (
    <div
      style={chatBotContainerStyle}
      onClick={handleChatClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Avatar style={avatarStyle}>
        <ChatIcon />
      </Avatar>
      {isChatOpen && <ChatMessageBox />}
    </div>
  );
};

export default ChatBot;
