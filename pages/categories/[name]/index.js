import Head from 'next/head'
import {titleIfy, slugify} from '../../../utils/helpers'
import fetchCategories from '../../../utils/provider/categoryProvider'
import inventoryForCategory from '../../../utils/inventoryForCategory'
import Product from '../../../layouts/main/common/Product';

const Category = (props) => {
  const {inventory, title} = props

  return (
    <>
      <Head>
        <title>Coffin ECommerce - {title}</title>
        <meta name="description" content={`Coffin ECommerce - ${title}`}/>
        <meta property="og:title" content={`Coffin ECommerce - ${title}`} key="title"/>
      </Head>
      <div className="flex flex-col">
        <div className="flex flex-col w-full">
          <div className="pt-4 pt-0 laptop:pt-10 pb-8">
            <h1 className="text-3xl laptop:text-5xl font-light">{titleIfy(title)}</h1>
          </div>
          <div>
            {/*<div className="flex flex-1 flex-wrap flex-row">*/}
              <div className='grid gap-4 grid-cols-1 ipad:grid-cols-2 laptop:grid-cols-4'>
              {
                inventory?.map((item, index) => {
                  return (
                    <Product
                      key={index}
                      // link={`${router.asPath}/product/${slugify(item.name)}`}
                      link={`/product/${slugify(item.name)}`}
                      title={item.name}
                      price={item.price}
                      imageSrc={item.image}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const categories = await fetchCategories()
  const paths = categories.map(category => {
    return {params: {name: slugify(category)}}
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const category = params.name.replace(/-/g, " ")
  const inventory = await inventoryForCategory(category)
  return {
    props: {
      inventory,
      title: category
    }
  }
}

export default Category
