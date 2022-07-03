import {useEffect, useState} from 'react';

import Dialog from '../../../../core/Dialog/Dialog';
import {Text} from '../../../../core';
import {Box, Col, Grid} from '../../../../core/Layout';
import {Button} from '../../../../core/Button';
import {XIcon} from '@heroicons/react/solid';
import bg from '../../../../public/images/newsletter-bg.png';
import Image from "../../../../core/Next/Image";
import {Input} from "../../../../core/Input";
import {useRouter} from "next/router";

const SubscribeDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      setTimeout(() => setIsOpen(true), 5000)
    }
  }, [])

  return (
    <Dialog
      isOpen={isOpen}
      closeDialog={async () => setIsOpen(false)}
      // width={700} height={365}
      classes=' w-[700px] h-[365px]'
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <Dialog.Content>
        <Box classes='relative'>
          <XIcon
            className='btn-icon hover:bg-white absolute top-[-30.7px] right-[-26.5px]'
            onClick={() => setIsOpen(false)}
          />
          <Grid sx={2} gapx={8}>
            <Image
              normalTag
              classes='h-[19rem] w-full rounded-lg'
              src='/images/noah.jpg'
            />
            <Col classes='text-center' self='center'>
              <Text h1 weight='bold' sx='lg' classes='mx-auto text-[22px]'>Subscribe Newsletter</Text>
              <Text sx='sm' weight='light' classes='my-3'>Subscribe the Drop store to get in touch and get the future update. </Text>
              <Input name='email' type='email' placeholder='Email Address'/>
              <Button type="submit" width='full' size='lg'>
                SUBSCRIBE
              </Button>
            </Col>
          </Grid>
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}

export default SubscribeDialog;