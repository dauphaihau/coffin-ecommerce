import {Divider, Paper, Text} from '../../core';
import {Box, Col, Grid, List, Row} from '../../core/Layout';
import {useAuth} from "../../context/authContext";
import {useEffect, useState} from "react";
import {useChannel} from '../../utils/hooks/AblyReactEffect';
import {useGetChannel} from "../../utils/hooks/useGetChannel";

const ChatApp = () => {

  let inputBox = null;
  let messageEnd = null;

  const [messageText, setMessageText] = useState('');
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably] = useChannel('coffin', (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  // useEffect(() => {
  //     useGetChannel()
  // },[])

  const sendChatMessage = (messageText) => {
    channel.publish({name: 'drop', data: messageText});
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
      return <Box classes='me' key={index} data-author={author}>{message.data}</Box>;
    }
    return <Row align='end' classes='other'>
      <img
        className='h-6 w-6 block rounded-full '
        src='/images/default/avatar-default.jpeg'
        alt='customer'
      />
      <Box classes='other__message other'>
        {message.data}
      </Box>
    </Row>
    // return <span key={index} data-author={author}>{message.data}</span>;
  });

  useEffect(() => {
    messageEnd?.scrollIntoView({behaviour: 'smooth'});
  });

  const {user} = useAuth();
  return (
    // <Paper classes='container mx-auto'>
    <Paper noPadding classes='chat-app'>
      <Grid lg={6} classes='min-w-full rounded'>
        {/* Left */}
        <Box classes='left'>
          {/*search*/}
          <Box classes='hidden relative m-3 md:block'>
            {/*<Box classes='mx-3 my-3'>*/}
            {/*<Box classes='relative text-gray-600'>*/}
            {/*  <span className='absolute inset-y-0 left-0 flex items-center pl-2'>*/}
            {/*    <svg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'*/}
            {/*         viewBox='0 0 24 24' className='w-6 h-6 text-gray-300'>*/}
            {/*      <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>*/}
            {/*    </svg>*/}
            {/*  </span>*/}
            {/*  <input type='search' className='block w-full py-2 pl-10 bg-gray-100 rounded outline-none' name='search'*/}
            {/*         placeholder='Search' required/>*/}
            {/*</Box>*/}

            <Row align='center' classes='absolute inset-y-0 left-0 pl-3 pointer-events-none'>
              <svg className='w-5 h-5 text-gray-500 dark:text-gray-custom-503' fill='currentColor' viewBox='0 0 20 20'
                   xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'/>
              </svg>
            </Row>
            <input type='text' id='email-adress-icon'
                   className='block p-2 pl-10 w-full text-gray-900
                    rounded-lg border border-gray-300 sm:text-sm
                   focus:ring-black focus:border-black bg-gray-50
                   dark:bg-black dark:border-gray-custom-502 dark:placeholder-gray-custom-503
                   dark:text-white dark:focus:ring-black dark:focus:border-black'
                   placeholder='Search...'/>
          </Box>
          {/* customer */}
          <List classes='customer-list'>
            {/*<h2 className='my-2 mb-2 ml-2 text-lg text-gray-600'>Chats</h2>*/}
            <List.Item>
              <a
                className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'>
                <img className='object-cover w-10 h-10 rounded-full'
                     src='/images/default/avatar-default.jpeg'
                     alt='customer'
                />
                <Box classes='w-full pb-2'>
                  <Box classes='flex justify-between'>
                    <span className='block ml-2 font-semibold text-gray-600'>John Don</span>
                    <span className='block ml-2 text-sm text-gray-600'>25 minutes</span>
                  </Box>
                  <span className='block ml-2 text-sm text-gray-600'>bye</span>
                </Box>
              </a>
              <a
                className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-100 border-b border-gray-300 cursor-pointer focus:outline-none'>
                <img className='object-cover w-10 h-10 rounded-full'
                     src='/images/default/avatar-default.jpeg'
                     alt='customer'
                />
                <Box classes='w-full pb-2'>
                  <Box classes='flex justify-between'>
                    <span className='block ml-2 font-semibold text-gray-600'>Emma</span>
                    <span className='block ml-2 text-sm text-gray-600'>50 minutes</span>
                  </Box>
                  <span className='block ml-2 text-sm text-gray-600'>Good night</span>
                </Box>
              </a>
              <a
                className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'>
                <img className='object-cover w-10 h-10 rounded-full'
                     src='/images/default/avatar-default.jpeg'
                     alt='customer'
                />
                <Box classes='w-full pb-2'>
                  <Box classes='flex justify-between'>
                    <span className='block ml-2 font-semibold text-gray-600'>Mala</span>
                    <span className='block ml-2 text-sm text-gray-600'>6 hour</span>
                  </Box>
                  <span className='block ml-2 text-sm text-gray-600'>Good Morning</span>
                </Box>
              </a>

              <a
                className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'>
                <img className='object-cover w-10 h-10 rounded-full'
                     src='/images/default/avatar-default.jpeg'
                     alt='customer'
                />
                <Box classes='w-full pb-2'>
                  <Box classes='flex justify-between'>
                    <span className='block ml-2 font-semibold text-gray-600'>Salmon</span>
                    <span className='block ml-2 text-sm text-gray-600'>10 hour</span>
                  </Box>
                  <span className='block ml-2 text-sm text-gray-600'>I need help</span>
                </Box>
              </a>

              <a
                className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'>
                <img className='object-cover w-10 h-10 rounded-full'
                     src='/images/default/avatar-default.jpeg'
                     alt='customer'
                />
                <Box classes='w-full pb-2'>
                  <Box classes='flex justify-between'>
                    <span className='block ml-2 font-semibold text-gray-600'>Pomp</span>
                    <span className='block ml-2 text-sm text-gray-600'>6 hour</span>
                  </Box>
                  <span className='block ml-2 text-sm text-gray-600'>Good Morning</span>
                </Box>
              </a>

              <a
                className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'>
                <img className='object-cover w-10 h-10 rounded-full'
                     src='/images/default/avatar-default.jpeg'
                     alt='customer'
                />
                <Box classes='w-full pb-2'>
                  <Box classes='flex justify-between'>
                    <span className='block ml-2 font-semibold text-gray-600'>Hill</span>
                    <span className='block ml-2 text-sm text-gray-600'>10 hour</span>
                  </Box>
                  <span className='block ml-2 text-sm text-gray-600'>Good Morning</span>
                </Box>
              </a>

              <a
                className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'>
                <img className='object-cover w-10 h-10 rounded-full'
                     src='/images/default/avatar-default.jpeg'
                     alt='customer'
                />
                <Box classes='w-full pb-2'>
                  <Box classes='flex justify-between'>
                    <span className='block ml-2 font-semibold text-gray-600'>Eren</span>
                    <span className='block ml-2 text-sm text-gray-600'>1 hour</span>
                  </Box>
                  <span className='block ml-2 text-sm text-gray-600'>Damn</span>
                </Box>
              </a>

            </List.Item>
          </List>
        </Box>

        {/* Right - Chat*/}
        <Box classes='right'>
          {/*head*/}
          <Row align='center' classes='head'>
            <img
              className='object-cover w-10 h-10 rounded-full'
              src='/images/default/avatar-default.jpeg'
              alt='customer'
            />
            <Col>
              <Text span classes='ml-2 font-bold'>Emma</Text>
              <Text classes='text-sm ml-2 text-gray-600'>Active now</Text>
            </Col>
            <span className='absolute w-2 h-2 bg-green-600 rounded-full left-[41px] bottom-[13px]'/>
          </Row>

          {/*body*/}
          <Box classes='body'>
            {messages}
          </Box>

          {/* footer*/}
          {/*<Row align='center' justify='between' classes='w-full p-3 border-t border-gray-300'>*/}


          <Row align='center' classes='bottom-0 my-2 w-[98%] px-2
            ml-2 px-2 flex flex-row  items-center w-full bg-[#f0f2f5] border rounded-3xl ;
            '>
            {/*<button>*/}
            {/*  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 text-gray-500' fill='none'*/}
            {/*       viewBox='0 0 24 24'*/}
            {/*       stroke='currentColor'>*/}
            {/*    <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'*/}
            {/*          d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/>*/}
            {/*  </svg>*/}
            {/*</button>*/}
            {/*<button>*/}
            {/*  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-gray-500' fill='none'*/}
            {/*       viewBox='0 0 24 24'*/}
            {/*       stroke='currentColor'>*/}
            {/*    <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'*/}
            {/*          d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'/>*/}
            {/*  </svg>*/}
            {/*</button>*/}

            <img
              className='h-6 w-6 rounded-full'
              src={user?.avatar}
              alt='profile'
            />

            <Box form onSubmit={handleFormSubmission}
                 classes='ml-2 px-2 flex flex-row  items-center w-full bg-[#f0f2f5] rounded-3xl h-[38px];'>
              <input
                type='text' placeholder='Your Message'

                ref={(element) => {
                  inputBox = element;
                }}
                onKeyPress={handleKeyPress}
                onChange={e => setMessageText(e.target.value)}
                value={messageText}
                className='
                bg-[#f0f2f5]
                border
                focus:ring-0
                focus:border-none
                 rounded-2xl  border-transparent
                  focus:outline-none h-[40px] text-sm flex items-center w-full'
                name='message' required/>
            </Box>

            {/*<input*/}
            {/*  type='text' placeholder='Message'*/}
            {/*  className='block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700'*/}
            {/*  name='message' required/>*/}

            {/*<button>*/}
            {/*  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-gray-500' fill='none'*/}
            {/*       viewBox='0 0 24 24'*/}
            {/*       stroke='currentColor'>*/}
            {/*    <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'*/}
            {/*          d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'/>*/}
            {/*  </svg>*/}
            {/*</button>*/}
            <Row>
              <button className='focus:outline-none mr-2 flex items-center justify-center w-8'>
                <Text i classes='fa-solid fa-image text-[#606060] text-xl'/>
              </button>
            </Row>
            <Row classes='border-r border-gray-300 mr-2'>
              <button className='focus:outline-none mr-2 flex items-center justify-center w-8 '>
                <Text i classes='fa-solid fa-paperclip fa-image text-[#606060] text-xl'/>
              </button>
            </Row>
            {/*<Divider classes='border-r-2 border-gray-300'/>*/}
            <button type='submit' className='focus:outline-none mr-3 flex items-center justify-center w-8'>
              <Text i classes='fa-solid fa-paper-plane text-[#606060] text-xl'/>
            </button>
            {/*<button type='submit'>*/}
            {/*  <svg className='w-5 h-5 text-gray-500 origin-center transform rotate-90'*/}
            {/*       xmlns='http://www.w3.org/2000/svg'*/}
            {/*       viewBox='0 0 20 20' fill='currentColor'>*/}
            {/*    <path*/}
            {/*      d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'/>*/}
            {/*  </svg>*/}
            {/*</button>*/}
          </Row>
        </Box>
      </Grid>
    </Paper>
  );
}

ChatApp.layout = 'admin'

export default ChatApp;

