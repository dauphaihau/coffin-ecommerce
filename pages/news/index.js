import {Card} from "../../components/Card";
import {Grid} from "../../components";

const News = () => {
  return (
    <div>
      <div className="pt-4 pt-0 laptop:pt-10 pb-8">
        <h1 className="text-3xl laptop:text-5xl font-light">News</h1>
      </div>
      <Grid md={2} lg={4} gap={8}>
        <Card
          imgSrc='/images/news/Coffin-Casket.png'
          title='What is the difference between a casket and a coffin?'
          content='The casket and coffin both are containers to hold a dead body. The purpose of both coffin and casket is the same for either burial or cremation. A casket and coffin are the same things, but do you know casket and a coffin is a different thing? Yes, you heard it correctly. There are certain differences which differ both from each other. Selecting a casket or coffin is a private decision. Before, guiding you to select the coffin or casket let’s know about them.'
        />
        <Card
          imgSrc='/images/news/astory.png'
          title='A story about craftsmanship'
          content='Our story began more than sixty years ago when Edward Hill jotted his first order onto an old playing card packet. Throughout this time, our family business has been committed to retaining the strongest possible values, today that story remains. Heritage, Innovation and Craftsmanship continue to form the foundation of our never-ending commitment. Today we are the custodians of long-held values, as well as helping to keep the traditional age-old craft of basket weaving alive. Because we are a family business, we believe that we do things differently.'
        />
        <Card
          imgSrc='/images/news/flower.png'
          title='Every process is important'
          content='We’re passionate about willow, this is reflected in everything we do, from the tiny tender shoots we plant and nurture, to the final piece of willow we craft into a wicker coffin as a finishing touch. Every detail matters and this ensures we deliver nothing less than an exceptional product.'
        />
      </Grid>
    </div>
  )
}

export default News;