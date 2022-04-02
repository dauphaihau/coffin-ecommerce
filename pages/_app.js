import '../styles/globals.scss'
import fetchCategories from "../utils/provider/categoryProvider";
import Layout from "../layout/layout";
import {UtilProvider} from "../context/utilContext";

function Ecommerce({Component, pageProps, categories}) {
  return (
      <UtilProvider>
        <Layout categories={categories}>
          <Component {...pageProps} />
        </Layout>
      </UtilProvider>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce
