import React from 'react';
import './Chat.css';
import Message from './Message';

const Chat = () => {
  const messages = [
    { senderName: 'Sender 1', messageContent: 'This is a sent message', messageType: 'sent' },
    { senderName: 'Sender 2', messageContent: 'This is a received message', messageType: 'received' },
    { senderName: 'Sender 3', messageContent: 'Another sent message', messageType: 'sent' },
  ];

  return (
    <div className='background'>
      <div className='discussion-topics'>
        <h2 className='topics-heading'>Discussion Topics</h2>
        <div className='topic'>#Topic 1</div>
        <div className='topic'>#Topic 2</div>
        <div className='topic'>#Topic 3</div>
      </div>
      <div className='chat-box'>
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}

        <div className='sendmessage'>
          <form className='message-form'>
            <input type='text' className='message-input' placeholder='Type your message...' />
            <button type='submit' className='send-button'>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
