
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./Bot.css"


export default function  Bot() {
    const {user} = useContext(AuthContext);
    console.log('entered bot section')
  const [state, setState] = useState(false);
  const [messages, setMessages] = useState([]);

  function toggleState() {
    setState(!state);
  }

  function onSendButton() {
    const textField = document.querySelector('.chatbox__support input');
    const text1 = textField.value;
    console.log(text1, 'text1 in sendButton')

    if (text1 === '') {
      return;
    }

    const msg1 = { name: user.username, message: text1 };
    const messagesCopy = [...messages, msg1];
    setMessages(messagesCopy);
    console.log(messagesCopy,' messages copy')

    fetch('https://aichatbot6.azurewebsites.net/predict', {
      method: 'POST',
      body: JSON.stringify({ message: text1 }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(r => r.json())
      .then(r => {
        const msg2 = { name: 'Sam', message: r.answer };
        console.log(msg2, ' msg2')
        const messagesCopy = [...messages, msg2];
        setMessages(messagesCopy);
        textField.value = '';
      })
      .catch((error) => {
        console.error('Error:', error);
        textField.value = '';
      });
  }

  function updateChatText() {
    let html = '';
    messages.slice().reverse().forEach(function(item, index) {
      if (item.name === 'Sam') {
        html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
      } else {
        html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
      }
    });

    const chatmessage = document.querySelector('.chatbox__support .chatbox__messages');
    chatmessage.innerHTML = html;
  }

  function display() {
    const openButton = document.querySelector('.chatbox__button');
    const chatBox = document.querySelector('.chatbox__support');
    const sendButton = document.querySelector('.send__button');

    openButton.addEventListener('click', () => toggleState(chatBox));

    sendButton.addEventListener('click', () => onSendButton(chatBox));

    const node = chatBox.querySelector('input');
    node.addEventListener('keyup', ({ key }) => {
      if (key === 'Enter') {
        onSendButton(chatBox);
      }
    });
  }
  
  return (
    <>
    
      <div className="chat-container" >
        <div className={`chatbox ${state ? 'chatbox--active' : ''}` }>
          <div className="chatbox__support">
            <div className="chatbox__header">
              <div className="chatbox__image--header">
                <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt=""></img>
              </div>
              <div className="chatbox__content--header">
                <h4 className="chatbox__heading--header">Chat support</h4>
                <p className="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
              </div>
            </div>
            <div className="chatbox__messages"> {updateChatText}
            <div className='messageArea'><span>{display}</span>
          {messages?.map((message,i) => (
          <p key={i}>{/*message.name*/}  {message.message}</p>
        ))}</div> 
            </div>
            <div className="chatbox__footer">
              <input type="textField" placeholder="Write a message..." />
              <button className="chatbox__send--footer send__button" onClick={onSendButton}>Send</button>
             
            </div>
          </div>
          {/* <div className="chatbox__button">
            <button ><img src='../../../images/chatbox-icon.svg' alt=''/></button>
        </div> */}
    </div>        </div>
        </>
        )
  }
  /*{messages?.map((message) => (
          <p>{message.name}  {message.message}</p>
        ))}*/