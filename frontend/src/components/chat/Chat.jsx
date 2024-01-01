import React, { useState } from 'react';
import './Chat.css';  // Make sure to import your CSS file
import Message from './Message';

const Chat = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newTopic, setNewTopic] = useState('');
  const [isCreatingTopic, setCreatingTopic] = useState(false);
  const [topics, setTopics] = useState(['#Topic 1', '#Topic 2', '#Topic 3']);

  const messages = [
    { senderName: 'Sender 1', messageContent: 'This is a sent message', messageType: 'sent', topic: '#Topic 1' },
    { senderName: 'Sender 2', messageContent: 'This is a received message', messageType: 'received', topic: '#Topic 2' },
    { senderName: 'Sender 3', messageContent: 'Another sent message', messageType: 'sent', topic: '#Topic 1' },
  ];

  const filteredMessages = selectedTopic
    ? messages.filter((message) => message.topic === selectedTopic)
    : messages;

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setCreatingTopic(false); 
  };

  const handleCreateTopicToggle = () => {
    setCreatingTopic(!isCreatingTopic);
  };

  const handleNewTopicChange = (event) => {
    setNewTopic(event.target.value);
  };

  const handleCreateTopic = (event) => {
    event.preventDefault();
    if (newTopic && !topics.includes(newTopic)) {
      setTopics([...topics, newTopic]);
      setSelectedTopic(newTopic);
      setCreatingTopic(false);
      setNewTopic('');
    }
  };

  const handleCancelCreateTopic = () => {
    setCreatingTopic(false);
    setNewTopic('');
  };

  return (
    <div className='background'>
      <div className='discussion-topics'>
        <h2 className='topics-heading'>Discussion Topics</h2>
        {topics.map((topic) => (
          <div key={topic} className='topic' onClick={() => handleTopicClick(topic)}>
            {topic}
          </div>
        ))}
        {isCreatingTopic ? (
          <form onSubmit={handleCreateTopic}>
            <input
              type='text'
              value={newTopic}
              onChange={handleNewTopicChange}
              placeholder='New Topic'
              className='message-input'
            />
            <button type='submit' className='send-button'>
              Create
            </button>
            <button type='button' className='cancel-button' onClick={handleCancelCreateTopic}>
              Cancel
            </button>
          </form>
        ) : (
          <div className='create-topic-button' onClick={handleCreateTopicToggle}>
            <img
              src='../../src/assets/add.png'
              alt="Create Topic"
              style={{ width: '24px', height: '24px' , cursor: 'pointer' }} 
            />
          </div>
        )}
      </div>
      <div className='discussion-chat'>
        <div className='chat-box'>
          {filteredMessages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
        </div>
        <div className='sendmessage'>
          <form className='message-form'>
            <input type='text' className='message-input' placeholder='Type your message...' />
            <button type='submit' className='send-button'>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
