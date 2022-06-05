import Input from "../../../core/Input/Input";
import {Button} from "../../../core/Button";

const Contact = () => {
  return (
    <div className='
    flex flex-col items-center
    justify-between
    laptop:flex-row py-8
    mt-12 text-center laptop:text-left
    bg-[#f9f9f9]
    ipad:p-16 rounded-lg
    '>
      <div className='mb-6'>
        <h1 className='text-[1.125rem] ipad:text-2xl laptop:text-3xl font-black mb-4'>Get Expert Tips In Your Inbox</h1>
        <p className='text-[0.75rem] ipad:text-[0.85rem] laptop:text-base font-light'>Subscribe to our newsletter and
          stay updated.</p>
      </div>
      <div className='
      px-6 ipad:pl-24 w-full
      flex flex-col ipad:flex-row
       gap-x-4 laptop:w-1/2
       '>
        <Input
          type='read-only'
          name='subscribe'
          classes='!p-4 w-full !h-[55px] !bg-white '
          placeholder='Write your email here'
          defaultValue=''
        />
        <Button classes='h-[3.4rem]'>Subscribe</Button>
      </div>
    </div>
  );
}

export default Contact;