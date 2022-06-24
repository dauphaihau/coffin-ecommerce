import Image from 'next/image';
import {Link} from '../../../core/Next';
import {Box, Col, Grid, List} from '../../../core/Layout';
import {Text} from '../../../core';

const Footer = () => {
  return (
    <Box footer classes='footer-main'>
      <Box classes='footer-main__links'>
        <Grid sx={2} md={3} lg={6} classes='wrapper-topics'>
          <Box className='topic'>
            <Text classes='topic__title'>Social</Text>
            <List classes='topic__links'>
              <List.Item classes='link'>
                <Link href='#' className='css-Link-component'>
                  <Text i classes='fa-brands fa-twitter icon-logo'/>Twitter
                </Link>
              </List.Item>
              <List.Item classes='link'>
                <Link href='#' className='css-Link-component'>
                  <Text i classes='fa-brands fa-instagram icon-logo'/> Instagram
                </Link>
              </List.Item>
              <List.Item classes='link'>
                <Link href='#' className='css-Link-component'>
                  <Text i classes='fa-brands fa-facebook-square icon-logo mr-3'/>Facebook
                </Link>
              </List.Item>
              <List.Item classes='link'>
                <Link href='#' className='css-Link-component'>
                  <Text i classes='fa-brands fa-youtube icon-logo mr-[2px]'/> Youtube
                </Link>
              </List.Item>
            </List>
          </Box>
          <Box className='topic'>
            <Text classes='topic__title'>Contact</Text>
            <List classes='topic__links footer-links'>
              {['Contact Us', 'Deck 5, ISS, LEO 51.603.', 'dauphaihau@outlook.com', 'Call us: 84901111921'].map((nameLink, id) => (
                <List.Item classes='link' key={id}>
                  <Link href='#' className='css-Link-component'>
                    {nameLink}
                  </Link>
                </List.Item>
              ))}
            </List>
          </Box>
          <Box className='topic'>
            <Text classes='topic__title'>About</Text>
            <List classes='topic__links footer-links'>
              {['Support center', 'Customer Support', 'About Us', 'Copyright'].map((nameLink, id) => (
                <List.Item classes='link' key={id}>
                  <Link href='#' className='css-Link-component'>
                    {nameLink}
                  </Link>
                </List.Item>
              ))}
            </List>
          </Box>
          <Box className='topic'>
            <Text classes='topic__title'>Customer Care</Text>
            <List classes='topic__links footer-links'>
              {['FAQ & Helps', 'Shipping & Delivery', 'Return & Exchanges'].map((nameLink, id) => (
                <List.Item classes='link' key={id}>
                  <Link href='#' className='css-Link-component'>
                    {nameLink}
                  </Link>
                </List.Item>
              ))}
            </List>
          </Box>
          <Box className='topic mt-8'>
            <Text classes='topic__title'>Our Information</Text>
            <List classes='topic__links footer-links'>
              {['Privacy policy', 'Terms & conditions', 'Return Policy', 'Site Map'].map((nameLink, id) => (
                <List.Item classes='link' key={id}>
                  <Link href='#' className='css-Link-component'>
                    {nameLink}
                  </Link>
                </List.Item>
              ))}
            </List>
          </Box>
          <Box className='topic mt-8'>
            <Text classes='topic__title'>Top Categories</Text>
            <List classes='topic__links footer-links'>
              {['Natural material coffin', 'Traditional coffin', 'American caskets'].map((nameLink, id) => (
                <List.Item classes='link' key={id}>
                  <Link href='#' className='css-Link-component'>
                    {nameLink}
                  </Link>
                </List.Item>
              ))}
            </List>
          </Box>
        </Grid>
      </Box>
      <Col align='center' justify='around' classes='footer-main__certification'>
        <Text span classes='copyright'>Copyright © 2022 Drop Store, Inc. All rights reserved.</Text>
        <Box classes='banks'>
          <List classes='wrapper-bank-list space-s-4 xs:space-s-5 lg:space-s-7'>
            <List.Item classes='bank'>
              <Link href='/' target='_blank'>
                <Image src='/images/payment/visa.png' alt='Visa' width='65' height='20'/>
              </Link>
            </List.Item>
            <List.Item classes='bank'>
              <Link href='/' target='_blank'>
                <Image src='/images/payment/paypal.png' alt='Paypal' width='76' height='20'/>
              </Link>
            </List.Item>
            <List.Item classes='bank'>
              <Link href='/' target='_blank'>
                <img src='/images/payment/amazon.png' alt='Amazon' width='86' height='20'/>
              </Link>
            </List.Item>
            <List.Item classes='bank'>
              <Link href='/' target='_blank'>
                <img src='/images/payment/apple-pay.png' alt='Apple Pay' width='66' height='20'/>
              </Link>
            </List.Item>
            <List.Item classes='bank'>
              <Link href='/' target='_blank'>
                <Image src='/images/payment/skrill.png' alt='Skrill' width='69' height='20'/>
              </Link>
            </List.Item>
          </List>
        </Box>
      </Col>
    </Box>
  );
}

export default Footer;