import '../styles/globals.scss'
import fetchCategories from "../utils/provider/categoryProvider";
import Layout from "../layout/layout";
import {UtilProvider} from "../context/utilContext";
import {AuthProvider} from "../context/authContext";
import FilterProvider from "../context/filterContext";

function Ecommerce({Component, pageProps, categories}) {

  return (
    <AuthProvider>
      <UtilProvider>
        <FilterProvider>
          <Layout categories={categories}>
            <Component {...pageProps} />
          </Layout>
        </FilterProvider>
      </UtilProvider>
    </AuthProvider>
  )
}

Ecommerce.getInitialProps = async () => {

  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce
