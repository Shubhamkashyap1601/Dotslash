// Message.jsx
import React from 'react';
import './Message.css';

const Message = ({ senderName, messageContent = 'Default Message', messageType }) => {
  const messageClassName = messageType === 'sent' ? 'sent-message' : 'received-message';

  return (
    <div className={messageClassName}>
      <div className='sender-name'>{senderName}</div>
      <div className='chat-message'>{messageContent}</div>
    </div>
  );
};

export default Message;
