import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Message from './components/Message/Message';
import { arrayWithMessages } from './types';
import axiosApi from './axiosApi';
let lastDate = '';

function App() {
  const [messages, setMessages] = useState<arrayWithMessages[]>([]);

  let message: string;

  let author: string;

  const setMessage = async () => {
    if (message !== undefined && author !== undefined) {
      const onjectForPost = {
        message,
        author,
      };
      await axiosApi.post('messages', onjectForPost);
    }
  }

  useEffect(() => {
    setInterval(async () => {
      if (lastDate === '') {
        const responseApi = await axiosApi.get('messages');
        const response: arrayWithMessages[] = responseApi.data;
        for (let i = 0; i < response.length; i++) {
          setMessages(prev => [...prev, { message: response[i].message, _id: response[i]._id, author: response[i].author, datetime: response[i].datetime }]);
          lastDate = response[i].datetime;
        }
      } else {
        const answerFromUrlApi = await axiosApi.get('messages?datetime=' + lastDate);
        const answerFromUrl: arrayWithMessages[] = answerFromUrlApi.data;

        if (answerFromUrl.length !== 0) {
          for (let i = 0; i < answerFromUrl.length; i++) {
            setMessages(prev => [...prev, { message: answerFromUrl[i].message, _id: answerFromUrl[i]._id, author: answerFromUrl[i].author, datetime: answerFromUrl[i].datetime }]);
            lastDate = answerFromUrl[i].datetime;
          }
        }
      }
    }, 3000)
  }, [])

  let onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage();
  };

  let createMessage = messages.map(message => (
    <Message key={message._id} date={message.datetime} message={message.message} author={message.author} />
  ));

  return (
    <div className="App">
      <form onSubmit={onFormSubmit}>
        <TextField id="outlined-basic" label="Enter message" onChange={(e) => {
          message = e.target.value
        }} required variant="outlined" />

        <TextField id="outlined-basic" label="Enter your name" onChange={e => {
          author = e.target.value
        }} required variant="outlined" />
        <Button variant="contained" type='submit'>Sande</Button>
      </form>
      {createMessage}
    </div>
  );
}

export default App;
