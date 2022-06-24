import {useEffect, useRef, useState} from 'react';
import {Text} from '../../../core';
import {Box, Col, Row} from '../../../core/Layout';
import {useChannel} from '../../../utils/hooks/AblyReactEffect';
import {useOnOutsideClick} from "../../../utils/hooks/useOnOutsideClick";
import {Image} from "../../../core/Next";

const ChatBox = () => {
  let inputBox = null;
  let messageEnd = null;

  const [messageText, setMessageText] = useState('');
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  // customer1
  // customer11
  // customer10

  const [channel, ably] = useChannel('coffin', (message) => {
    // const [channel, ably] = useChannel('coffin', (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  // customer1
  // customer11
  // customer10

  const sendChatMessage = (messageText) => {
    // channel.publish({name: 'customer1', data: messageText});
    channel.publish({name: 'customer11', data: messageText});
    setMessageText('');
    inputBox.focus();
  }

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  }

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  }

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? 'me' : 'other';

    if (author === 'me') {
      return <Box classes='customer' key={index} data-author={author}>{message.data}</Box>;
    }
    return <Row align='end' classes='bot'>
      <img
        className='h-6 w-6 block rounded-full '
        src='/images/bot.png'
        alt='profile'
      />
      <Box classes='bot__message other'>
        {message.data}
      </Box>
    </Row>
    // return <span key={index} data-author={author}>{message.data}</span>;
  });

  useEffect(() => {
    messageEnd?.scrollIntoView({behaviour: 'smooth'});
  });

  const [openChatBox, setOpenChatBox] = useState(false)
  const innerRef = useOnOutsideClick(() => {
    setOpenChatBox(!openChatBox)
  });

  // console.log('messages', messages)

  const renderBody = () => {
    return (
      <Col id='chat' classes='body'>
        <Text classes='text-[12px] text-[#8a8d91] mx-auto'>Mon 10, 2022, 1:10 PM</Text>
        {/*<Box*/}
        {/*  classes='w-max ml-auto break-all mt-2 mb-1 px-[12px] py-[8px] rounded-br-md bg-[#606060] rounded-2xl text-white text-left '>*/}
        {/*  seriously?*/}
        {/*</Box>*/}
        {/*<Box*/}
        {/*  classes='w-max ml-auto break-all mb-1 px-[12px] py-[8px] rounded-tr-md bg-[#606060] rounded-2xl text-white text-left '>*/}
        {/*  ....*/}
        {/*</Box>*/}


        {/*<Box classes='customer'>*/}
        {/*All my loved ones are dead, so can you bring me into my casket?*/}

        <Row align='center' classes='bot'>
          <img
            className='h-6 w-6 block rounded-full '
            src='/images/bot.png'
            alt='profile'
          />
          <Box classes='bot__message other'>
            How may I help you today?
          </Box>
        </Row>
        {messages}
        {/*</Box>*/}

        {/*<div ref={(element) => { messageEnd = element; }}></div>*/}

        {/*<Row align='center' classes='bot'>*/}
        {/*  <img*/}
        {/*    className='h-6 w-6 block rounded-full '*/}
        {/*    src='/images/bot.png'*/}
        {/*    alt='profile'*/}
        {/*  />*/}
        {/*  <Box classes='bot__message other'>*/}
        {/*    Sorry, I'm just a bot*/}
        {/*  </Box>*/}
        {/*</Row>*/}
      </Col>
    )
  }

  return (
    <Box classes='chat-box'>
      {
        !openChatBox
          ? <Box
            classes='chat-box__disabled'
            onClick={() => setOpenChatBox(true)}
          >
            <Text i classes='fa-solid fa-comment-dots icon-btn'/>
          </Box>
          :
          <Box ref={innerRef} classes='chat-box__enabled'>
            <Row justify='between' align='center' classes='header'>
              <Row>
                <Box classes='bot'>
                  <Image
                    normalTag
                    classes='bot__img'
                    src='/images/bot.png'
                    alt='profile'
                  />
                  <Text i classes='fa-solid fa-circle bot__statusIcon '/>
                </Box>
                <Box>
                  <Text h1 sx='xl' weight='bold' classes='leading-3 pt-2'>Bot</Text>
                  <Text classes='text-[0.8rem] text-gray-700 '>Online</Text>
                </Box>
              </Row>
              <Text i classes='fa-solid fa-x btn-icon text-base pl-[0.6rem]' onClick={() => setOpenChatBox(false)}
              />
            </Row>
            {renderBody()}
            {/*Footer*/}
            <Row align='center' classes='footer'>
              <Row>
                <button className='focus:outline-none flex items-center justify-center w-8'>
                  <Text i classes='fa-solid fa-image text-[#606060] text-xl'/>
                </button>
              </Row>
              <Row>
                <button className='focus:outline-none flex items-center justify-center w-8'>
                  <Text i classes='fa-solid fa-paperclip fa-image text-[#606060] text-xl'/>
                </button>
              </Row>


              {/*Form submit*/}
              <Box form onSubmit={handleFormSubmission} classes='form border-gray'>
                {/*px-2'>*/}
                <Box classes='w-full'>
                  <input
                    ref={(element) => {
                      inputBox = element;
                    }}
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    type='text'
                    id='message'
                    className='input'
                    placeholder='Type your message....'
                    // placeholder='Aa'
                  />
                </Box>
                <Row>
                  <button type='submit' className='submit-btn'>
                    <Text i classes='fa-solid fa-paper-plane text-[#606060] text-xl'/>
                    {/*   <Text i classes='fa-solid fa-face-smile*/}
                    {/*text-[#606060] text-xl'></i>*/}
                  </button>
                </Row>
              </Box>
            </Row>
          </Box>
      }
    </Box>
  );
}

export default ChatBox;


