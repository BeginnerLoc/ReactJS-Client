// BotProvider.js
import React, { useState } from 'react';
import BotContext from './BotContext';
import axios from 'axios';

const BotProvider = ({ children }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [botAnswer, setBotAnswer] = useState("Ni Hao");

  const updateData = (newData) => {
    if (newData.length !== 0 && newData.length < 50) {
      setFilteredData(newData);
      askGPT(newData)
    }
  };

  const askGPT = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/ask_gpt', {
        data: data
      });

      var answer = response.data.answer;
      setBotAnswer(answer)
      console.log('Answer:', answer);
    } catch (error) {
      console.error('Error:', error);
    }

  };


  return (
    <BotContext.Provider value={{ filteredData, updateData, botAnswer }}>
      {children}
    </BotContext.Provider>
  );
};

export default BotProvider;
