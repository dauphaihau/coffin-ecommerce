import Ably from "ably/promises";
import {useEffect} from 'react'

const ably = new Ably.Realtime.Promise({authUrl: '/api/chat/createTokenRequest'});

// console.log('ably', ably)

export function useChannel(channelName, callbackOnMessage) {
  const channel = ably.channels.get(channelName);

  // channel.history(function (err, resultPage) {
  //   const messages = resultPage.items,
  //     messagesData = [];
  //   // console.log('messages-data', messagesData)
  //   // console.log('messages-data', messages)
  //
  //   if (err) {
  //     console.log('✗ History failed: ' + err.message, 'red');
  //   } else {
  //     console.log('✓ ' + messages.length + ' messages in history', 'green');
  //     for (let i = 0; i < messages.length; i++) {
  //       messagesData.push('"' + messages[i].data + '"');
  //     }
  //     if (messages.length) {
  //       console.log('✓ Message history: ' + messagesData.join(', '), 'green');
  //     }
  //   }
  // });

  // console.log('channel', channel)

  const onMount = () => {
    channel.subscribe(msg => {
      callbackOnMessage(msg);
    });
  }

  const onUnmount = () => {
    channel.unsubscribe();
  }

  const useEffectHook = () => {
    onMount();
    return () => {
      onUnmount();
    };
  };

  useEffect(useEffectHook);

  return [channel, ably];
}