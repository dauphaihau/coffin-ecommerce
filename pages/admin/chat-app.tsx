import {Divider, Image, Paper, Text} from '../../core';
import {Box, Col, Grid, List, Row} from '../../core/Layout';
import {useAuth} from "../../context/authContext";
import {useEffect, useState} from "react";
import {useChannel} from '../../utils/hooks/AblyReactEffect';
import {useGetChannel} from "../../utils/hooks/useGetChannel";
import {Helmet} from "../../layouts/admin/common/Helmet";

const dataFake = [
  {name: 'John Don', timeLeft: '25 minutes', messages: 'Bye', type: 0},
  {name: 'Emma', timeLeft: '50 minutes', messages: 'Good night', type: 2},
  {name: 'Mala', timeLeft: '6 hour', messages: 'Good morning', type: 0},
  {name: 'Salmon', timeLeft: '10 hours', messages: 'I need help', type: 1},
  {name: 'Pomp', timeLeft: '6 hour', messages: 'Nothing change', type: 0},
  {name: 'Bill', timeLeft: '14 hour', messages: 'Where is my Mind?', type: 0},
  {name: 'Eren', timeLeft: '23 minutes', messages: 'Damn it', type: 0},
  {name: 'MailLan', timeLeft: '1 hours', messages: 'LoremIs', type: 0},
  {name: 'Armin', timeLeft: '2 hours', messages: 'LoremIs', type: 0},
  {name: 'Lam', timeLeft: '3 days', messages: 'What a good day to die', type: 0},
]

const dataBreadcrumb = [
  {path: '/admin', name: 'Dashboard', firstLink: true},
  {path: '', name: 'Chat', lastLink: true}
];

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
    <>
      <Helmet title='Chat' dataBreadcrumb={dataBreadcrumb}/>
      <Paper noPadding classes='chat-app'>
        <Grid lg={6} classes='min-w-full h-full rounded'>
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
              <List.Item>

                {
                  dataFake.map((o, index) => {
                    if (o.type === 1) {
                      return <a
                        className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'>
                        <img className='object-cover w-10 h-10 rounded-full'
                             src='/images/default/avatar-default.jpeg'
                             alt='customer'
                        />
                        <Box classes='w-full ml-2'>
                          <Row justify='between'>
                            <span className='block ml-2 font-semibold text-gray-600'>{o.name}</span>
                            <span className='block ml-2 text-sm text-gray-custom-505'>{o.timeLeft}</span>
                          </Row>
                          <Row justify='between' align='center'>
                            <span className='block ml-2 text-sm font-semibold text-gray-600'>{o.messages}</span>
                            {/*<span className='block ml-2 text-sm font-semibold text-gray-600'>{o.messages}</span>*/}
                            <span className='w-2 h-2 bg-[#3a91fa] rounded-full left-[41px] bottom-[13px]'/>
                          </Row>
                        </Box>
                      </a>
                    }
                    return (
                      <a
                        className={`flex items-center px-3 py-2 text-sm transition
                         duration-150 ease-in-out border-b border-gray-300 
                         cursor-pointer  focus:outline-none
                         ${o.type === 2 ? 'bg-gray-100' : 'hover:bg-gray-100'}
                         `}>
                        <img className='object-cover w-10 h-10 rounded-full'
                             src='/images/default/avatar-default.jpeg'
                             alt='customer'
                        />
                        <Box classes='w-full ml-2'>
                          <Row justify='between'>
                            <span className='block ml-2 font-semibold text-gray-600'>{o.name}</span>
                            <span className='block ml-2 text-sm text-gray-custom-505'>{o.timeLeft}</span>
                          </Row>
                          <Row justify='between' align='center'>
                            <span className='block ml-2 text-sm text-gray-custom-506'>{o.messages}</span>
                          </Row>
                        </Box>
                      </a>
                    )
                  })
                }
              </List.Item>
            </List>
          </Box>

          {/* Right - Chat*/}
          <Box classes='right'>
            {/*head*/}
            <Row align='center' classes='head'>
              <Image
                normalTag
                classes='object-cover w-10 h-10 rounded-full'
                src='/images/default/avatar-default.jpeg'
                alt='customer'
              />
              <Col>
                <Text span classes='ml-2 font-bold'>Emma</Text>
                <Text classes='text-sm ml-2 text-gray-600'>Active now</Text>
              </Col>
              <Text span classes='absolute w-2 h-2 bg-green-600 rounded-full left-[41px] bottom-[13px]'/>
            </Row>

            {/*body*/}
            <Box classes='body'>
              {messages}
              <Box ref={(element) => messageEnd = element}></Box>
            </Box>

            <Row align='center' classes='bottom-0 my-2 w-[97%] px-2 ml-2 px-2 flex flex-row  items-center w-full bg-[#f0f2f5] border rounded-lg'>
              <Image
                normalTag
                // classesSize='h-[24px] w-[32px]'
                classes='h-[24px] w-[32px] rounded-full'
                src={user?.avatar}
                alt='profile'
              />
              <Box form onSubmit={handleFormSubmission}
                   classes='px-2 flex flex-row  items-center w-full bg-[#f0f2f5] rounded-3xl h-[38px];'>
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
              <Row>
                <button className='focus:outline-none mr-2 flex items-center justify-center w-8
                hover:bg-gray-200 animate rounded-full'>
                  <Text i classes='fa-solid fa-image hover:bg-gray-200 text-[#606060] text-xl'/>
                </button>
              </Row>
              <Row classes='border-r border-gray-custom-499 mr-2'>
                <button className='focus:outline-none mr-2 flex items-center justify-center w-8 '>
                  <Text i classes='fa-solid fa-paperclip fa-image text-[#606060] text-xl'/>
                </button>
              </Row>
              {/*<Divider classes='border-r-2 border-gray-300'/>*/}
              <button type='submit' className='focus:outline-none flex items-center justify-center w-8'>
                <Text i classes='fa-solid fa-paper-plane text-[#606060] text-xl'/>
              </button>
            </Row>
          </Box>
        </Grid>
      </Paper>
    </>
  );
}

ChatApp.layout = 'admin'

export default ChatApp;

