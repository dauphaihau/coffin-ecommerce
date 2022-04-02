import Input from "./Input/Input";
import {Button} from "./index";

const Contact = () => {
  return (
    <div className='
    flex flex-col laptop:flex-row justify-between
    mt-12 text-center laptop:text-left
    ipad:bg-[#f9f9f9]
    ipad:p-16 rounded-lg
    '>
      <div className='mb-6'>
        <h1 className='text-[1.125rem] ipad:text-2xl laptop:text-3xl font-black'>Get Expert Tips In Your Inbox</h1>
        <p className='text-[0.75rem]'>Subscribe to our newsletter and stay updated.</p>
      </div>
      <div className='
      px-6 ipad:px-24
      flex flex-col laptop:flex-row
       gap-x-4 laptop:w-1/2
       '>
        <Input className='!p-4 w-full !h-[55px] !bg-white !text-black' placeholder='Write your email here'/>
        <Button className='h-[3.4rem]'>Subscribe</Button>
      </div>
    </div>
  );
}

export default Contact;