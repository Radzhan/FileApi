import React, { useEffect, useState } from 'react';
import './App.css';
import Message from './components/Message/Message';
import { arrayWithMessages } from './types';
let lastDate = '';

function App() {
  const [messages, setMessages] = useState<arrayWithMessages[]>([]);

  const url = 'http://localhost:8000/messages';

  let message: string;

  let author: string;

  const setMessage = async () => {
    if (message !== undefined && author !== undefined) {
      const data = new URLSearchParams();

      data.set('message', message);
      data.set('author', author);

      await fetch(url, {
        method: 'post',
        body: data,
      });
    }
  }

  useEffect(() => {
    setInterval(async () => {

      if (lastDate === '') {
        const response = await fetch(url);
        const answer: arrayWithMessages[] = await response.json();
        for (let i = 0; i < answer.length; i++) {
          setMessages(prev => [...prev, { message: answer[i].message, _id: answer[i]._id, author: answer[i].author, datetime: answer[i].datetime }]);
          lastDate = answer[i].datetime;
        }
      } else {
        const lastUrl = 'http://localhost:8000/messages?datetime=' + lastDate;

        const answerFromUrl = await fetch(lastUrl);
        const answerFromUrlArr: arrayWithMessages[] = await answerFromUrl.json();

        if (answerFromUrlArr.length !== 0) {
          for (let i = 0; i < answerFromUrlArr.length; i++) {
            setMessages(prev => [...prev, { message: answerFromUrlArr[i].message, _id: answerFromUrlArr[i]._id, author: answerFromUrlArr[i].author, datetime: answerFromUrlArr[i].datetime }]);
            lastDate = answerFromUrlArr[i].datetime;
          }
        }
      }

    }, 3000)
  }, [])

  let createMessage = messages.map(message => (
    <Message key={message._id} message={message.message} author={message.author} />
  ))

  return (
    <div className="App">
      <form onSubmit={e => {
        e.preventDefault()
      }}>
        <input type="text" placeholder='Enter message' onChange={(e) => {
          message = e.target.value
        }} required />
        <input type="text" placeholder='Enter your name' onChange={e => {
          author = e.target.value
        }} required />
        <button type='submit' onClick={setMessage}>Sande</button>
      </form>
      {createMessage}
    </div>
  );
}

export default App;
