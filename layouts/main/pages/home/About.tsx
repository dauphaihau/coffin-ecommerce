import {Box, Col, Grid, Row} from "../../../../core/Layout";
import {Text} from "../../../../core";
import Image from "../../../../core/Next/Image";

const About = () => {
  return (
    <Box>
      <Grid sx={1} lg={2} classes=''>
        <Box classes='p-8'>
          <Text weight='light'>FAMILY RUN BUSINESS</Text>
          <Text h1 classes='text-[36px] my-4'>WHO ARE WE?</Text>
          <Text weight='light' classes='mb-6 leading-7  pr-26 desktop:pr-32'>
            Direct Coffins & Caskets is the worlds most comprehensive coffin & casket website. We provide the ability to
            purchase coffins & caskets directly at approximately half the price of a funeral director. We keep our stock
            in Central London. When buying a coffin from us you have an option of viewing the coffin before making a
            final decision. Once you have made your decision the coffin will be delivered to your local funeral director
            the next day.
          </Text>
          <Box>
            <Grid sx={2} classes='mb-6'>
              <Box>
                <Row>
                  <Image
                    normalTag alt='quality'
                    classes='h-10 w-10 mr-5'
                    src='/images/about/quality-icon.jpg'
                  />
                  <Col classes='w-2/3'>
                    <Text weight='bold'>Quality</Text>
                    <Text weight='light text-sm'>Handmade by master craftsmen</Text>
                  </Col>
                </Row>
              </Box>
              <Box>
                <Row>
                  <Image
                    normalTag alt='measure'
                    classes='h-10 w-10 mr-5'
                    src='/images/about/measure-icon.png'
                  />
                  <Col classes='w-2/3'>
                    <Text weight='bold'>Bespoke</Text>
                    <Text weight='light text-sm'>Large variety of coffins and bespoke builds</Text>
                  </Col>
                </Row>
              </Box>
            </Grid>
            <Grid sx={2}>
              <Box>
                <Row>
                  <Image
                    normalTag alt='value'
                    classes='h-10 w-10 mr-5'
                    src='/images/about/value-icon.png'
                  />
                  <Col classes='w-2/3'>
                    <Text weight='bold'>Value</Text>
                    <Text weight='light text-sm'>50% cheaper than funeral directors.</Text>
                  </Col>
                </Row>
              </Box>
              <Box>
                <Row>
                  <Image
                    normalTag
                    classes='h-10 w-10 mr-5'
                    src='/images/about/delivery-icon.png'
                  />
                  <Col classes='w-2/3'>
                    <Text weight='bold'>Quality</Text>
                    <Text weight='light text-sm'>Handmade by master craftsmen</Text>
                  </Col>
                </Row>
              </Box>
            </Grid>
          </Box>
        </Box>
        <Box classes='p-8'>
          <Image
            normalTag
            classes='h-94 w-94 rounded-lg'
            src='/images/about/woodwork-banner.jpg'
          />
        </Box>
      </Grid>
    </Box>
  );
}

export default About;