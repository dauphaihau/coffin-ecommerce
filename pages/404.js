import {Button, Link} from "../components";

export default function Custom404() {
  return <div className='flex flex-col justify-center items-center mb-4'>
    <img src="/images/404.png" height={100} width={900} alt=""/>
    <h1 className='text-4xl mb-3'>Looks like you are lost</h1>
    <p className='mb-8 font-light'>We can't find the page you're looking for</p>
    <Link href='/'>
      <Button>Go home</Button>
    </Link>
  </div>

}