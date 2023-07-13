import React, { useState, useEffect, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import BotContext from '../context/BotContext';

const ChatMessageBox = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const { botAnswer } = useContext(BotContext);

  useEffect(() => {
    // Simulating loading messages from an API or delay before displaying
    setMessages([...messages, { text: botAnswer, sender: 'bot' }]);
    setShowChat(true);
  }, [botAnswer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = e.target.message.value;
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    e.target.message.value = '';
  };

  const chatMessageBoxStyle = {
    opacity: showChat ? 1 : 0, // Add opacity based on showChat state
    transition: 'opacity 0.3s', // Add transition for smooth fade-in effect
  };

  return (
    <Paper
      elevation={3}
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '30px',
        width: '350px',
        height: '350px',
        borderRadius: '8px',
        backgroundColor: colors.primary[400],
        display: 'flex',
        flexDirection: 'column',
        ...chatMessageBoxStyle, // Apply fade-in transition
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          backgroundColor: colors.blueAccent[700],
          padding: '10px',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
          AI Assistant
        </Typography>
      </div>
      <div
        style={{
          flex: 1,
          maxHeight: '300px',
          overflowY: 'auto',
          marginBottom: '10px',
          backgroundColor: colors.primary[400],
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((message, index) => (
          <Paper
            key={index}
            elevation={2}
            style={{
              margin: '8px',
              padding: '8px',
              backgroundColor: message.sender === 'user' ? colors.blueAccent[700] : '#fff',
              textAlign: message.sender === 'user' ? 'right' : 'left',
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              display: 'inline-block',
              width: '200',
            }}
          >
            <Typography
              variant="body1"
              style={{
                color: message.sender === 'user' ? '#fff' : colors.blueAccent[700],
              }}
            >
              {message.text}
            </Typography>
          </Paper>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', margin: '8px' }}>
        <TextField
          variant="outlined"
          placeholder="Type a message..."
          fullWidth
          size="small"
          style={{ marginRight: '10px' }}
          name="message"
        />
        <Box>
          <IconButton color={colors.blueAccent[700]} type="submit">
            <SendIcon />
          </IconButton>
        </Box>
      </form>
    </Paper>
  );
};

export default ChatMessageBox;
