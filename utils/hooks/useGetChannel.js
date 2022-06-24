import Ably from "ably/promises";
import {useEffect} from 'react'

const ably = new Ably.Realtime.Promise({authUrl: '/api/retriveHistory'});

export function useGetChannel(channelName = 'coffin', callbackOnMessage) {
  const channel = ably.channels.get(channelName);

  channel.history(function (err, resultPage) {
    const messages = resultPage.items,
      messagesData = [];
    console.log('messages-data', messagesData)

    if (err) {
      console.log('✗ History failed: ' + err.message, 'red');
    } else {
      console.log('✓ ' + messages.length + ' messages in history', 'green');
      for (let i = 0; i < messages.length; i++) {
        messagesData.push('"' + messages[i].data + '"');
      }
      if (messages.length) {
        console.log('✓ Message history: ' + messagesData.join(', '), 'green');
      }
    }
  });


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