import {useEffect, useRef, useState} from "react";
import {Text} from "../../../core";
import {Stack} from "../../../core/Layout";

function useOuterClick(callback) {
  const innerRef = useRef();
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
    }
  }, []);

  return innerRef;
}

const ChatBox = () => {
  const [openChatBox, setOpenChatBox] = useState(false)
  const innerRef = useOuterClick(() => {
    setOpenChatBox(!openChatBox)
  });

  return (
    <div className='hidden laptop:block'>
      {
        !openChatBox
          ? <div
            className='p-3 px-4 bg-black rounded-full fixed bottom-[2%] right-[1%] z-10

           cursor-pointer
           drop-shadow-2xl '
            onClick={() => setOpenChatBox(true)}
          >
            <i className="fa-solid text-white text-3xl fa-comment-dots drop-shadow-2xl "/>
          </div>
          :
          <div
            ref={innerRef}
            // className="fixed bottom-[4%] right-[3%] z-[300] flex flex-col h-2/4 w-1/5 bg-white rounded-xl shadow-2xl">
            className="fixed bottom-0 right-[3%] z-[300] flex flex-col max-h-[53%] max-w-1/5 bg-white rounded-t-xl  shadow-2xl">
            <Stack classes='px-[12px] py-[8px] border-t-black border-b items-center shadow rounded-tl-xl rounded-tr-xl'>
              <div className='flex'>
                <div className='relative mr-3'>
                  <img
                    className="h-10 w-10 rounded-full "
                    src='/images/bot.png'
                    alt="profile"
                  />
                  <i className="fa-solid fa-circle absolute  bottom-[2px] right-0 text-green-500 text-[9px]"></i>
                </div>
                <div>
                  <Text h1 sx='xl' weight='bold' classes='leading-3 pt-2'>Bot</Text>
                  <p className='text-[0.8rem] text-gray-700 '>Online</p>
                </div>
              </div>
              <i className="fa-solid fa-x btn-icon text-base pl-[0.6rem]"
                 onClick={() => setOpenChatBox(false)}
              />
            </Stack>
            <div id="chat" className="flex flex-col mt-2 flex-col-reverse overflow-y-scroll mb-20 pb-6 px-2 ">
              <div
                className="w-max ml-auto break-all mb-1 px-[12px] py-[8px] rounded-tr-md bg-[#606060] rounded-2xl text-white text-left ">
                ....
              </div>
              <div
                className="w-max ml-auto break-all mt-2 mb-1 px-[12px] py-[8px] rounded-br-md bg-[#606060] rounded-2xl text-white text-left ">
                seriously?
              </div>
              <div className='flex items-center'>
                <img
                  className="h-6 w-6 block rounded-full "
                  src='/images/bot.png'
                  alt="profile"
                />
                <div
                  className="w-max other break-all mt-2  ml-2  float-none bg-[#e4e6ea]  rounded-2xl px-[12px] py-[8px]">
                  Sorry, I'm just a bot
                </div>
              </div>
              <div
                className="max-w-[14.6rem] ml-auto break-all mt-2 mb-1 px-[12px] py-[8px] bg-[#606060] rounded-2xl text-white text-left">
                All my loved ones are dead, so can you bring me into my casket?
              </div>
              <div className='flex items-center'>
                <img
                  className="h-6 w-6 block rounded-full "
                  src='/images/bot.png'
                  alt="profile"
                />
                <div
                  className="w-max other break-all mt-2  ml-2 float-none bg-[#e4e6ea]  rounded-2xl px-[12px] py-[8px]">
                  How may I help you today?
                </div>
              </div>
              <p className='text-[12px] text-[#8a8d91] mx-auto'>Mon 10, 2022, 1:10 PM</p>
            </div>

            {/*Footer*/}
            <div className="flex flex-row items-center bottom-0 my-2 w-full px-2">
              <div className="flex flex-row">
                <button className="focus:outline-none flex items-center justify-center w-8">
                  <i className="fa-solid fa-image text-[#606060] text-xl"/>
                </button>
              </div>
              <div className="flex flex-row">
                <button className="focus:outline-none flex items-center justify-center w-8">
                  <i className="fa-solid fa-paperclip fa-image text-[#606060] text-xl"/>
                </button>
              </div>
              <div
                className="ml-2 px-2 flex flex-row border-gray items-center w-full bg-[#f0f2f5] border rounded-3xl h-[38px]">
                {/*px-2">*/}

                <div className="w-full">
                  <input
                    type="text"
                    id="message"
                    className="border bg-[#f0f2f5] focus:ring-0 focus:border-none rounded-2xl  border-transparent
                 w-full focus:outline-none h-[36px] text-sm flex items-center"
                    placeholder="Type your message...."
                  />
                </div>
                <div className="flex flex-row">
                  <button
                    className="focus:outline-none flex items-center justify-center w-8">
                    <i className="fa-solid fa-paper-plane text-[#606060] text-xl"/>
                    {/*   <i className="fa-solid fa-face-smile*/}
                    {/*text-[#606060] text-xl"></i>*/}
                  </button>
                </div>
              </div>
            </div>

          </div>
      }
    </div>
  );
}

export default ChatBox;