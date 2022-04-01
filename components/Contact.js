import Input from "./Input/Input";
import {Button} from "./index";

const Contact = () => {
  return (
    <div className='flex justify-between mt-12 bg-[#f9f9f9] p-16 rounded-lg'>
      <div>
        <h1 className='text-3xl font-black'>Get Expert Tips In Your Inbox</h1>
        <p>Subscribe to our newsletter and stay updated.</p>
      </div>
      <div className='flex gap-x-4 w-1/3'>
        <Input className='!p-4 w-full !h-[55px] !bg-white !text-black' placeholder='Write your email here'/>
        <Button className='h-[3.4rem]'>Subscribe</Button>
      </div>
    </div>
  );
}

export default Contact;