import React, { useState, useEffect, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import BotContext from '../context/BotContext';

const AiAssistant = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const { botAnswer } = useContext(BotContext);

  useEffect(() => {
    // Simulating loading messages from an API or delay before displaying
    if (botAnswer != null) {
      setMessages([...messages, { text: botAnswer, sender: 'bot' }]);
    }
    setShowChat(true);
  }, [botAnswer]);

  const chatMessageBoxStyle = {
    opacity: showChat ? 1 : 0, // Add opacity based on showChat state
    transition: 'opacity 0.3s', // Add transition for smooth fade-in effect
  };

  return (
    <Paper
      elevation={3}
      style={{
        width: '100%',
        height: '200px',
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
          paddingLeft: '8px',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
          Intelligent Analysis
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
            <div
              style={{
                whiteSpace: 'pre-line',
                color: message.sender === 'user' ? '#fff' : colors.blueAccent[700],
              }}
            >
              {message.text}
            </div>
          </Paper>
        ))}
      </div>
    </Paper>
  );
};

export default AiAssistant;
