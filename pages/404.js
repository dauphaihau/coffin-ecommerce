import {Button} from "../core/Button";
import {Image, Link} from "../core/Next";
import {Text} from "../core";
import {Col} from "../core/Layout";

export default function Custom404() {
  return (
    <Col classes='flex-center mb-4'>
      <Image
        src="/images/404.png"
        classesSize='h-[500px] laptop:h-[640px] w-full'
        alt='404'
      />
      <Text h1 sx='xl' lg='4xl' classes='mb-3'>Looks like you are lost</Text>
      <Text sx='sm' weight='light' classes='mb-8'>We can&apos;t find the page you&apos;re looking for</Text>
      <Link href='/'>
        <Button>Go home</Button>
      </Link>
    </Col>
  )
}