import Head from 'next/head'
import Product from '../../../components/Product'
import {titleIfy, slugify} from '../../../utils/helpers'
import fetchCategories from '../../../utils/provider/categoryProvider'
import inventoryForCategory from '../../../utils/inventoryForCategory'
import {useRouter} from "next/router";

const Category = (props) => {
  const {inventory, title} = props
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Coffin ECommerce - {title}</title>
        <meta name="description" content={`Coffin ECommerce - ${title}`}/>
        <meta property="og:title" content={`Coffin ECommerce - ${title}`} key="title"/>
      </Head>
      <div className="flex flex-col">
        <div className="flex flex-col w-full">
          <div className="pt-4 sm:pt-10 pb-8">
            <h1 className="text-5xl font-light">{titleIfy(title)}</h1>
          </div>
          <div>
            <div className="flex flex-1 flex-wrap flex-row">
              {
                inventory?.map((item, index) => {
              console.log('log', `${router.asPath}/product/${slugify(item.name)}`)
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
