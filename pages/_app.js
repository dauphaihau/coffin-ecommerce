import '../styles/globals.scss'
import fetchCategories from "../utils/provider/categoryProvider";
import Layout from "../layout/layout";
import {UtilProvider} from "../context/utilContext";
import {AuthProvider} from "../context/authContext";

function Ecommerce({Component, pageProps, categories}) {
  return (
    <AuthProvider>
      <UtilProvider>
        <Layout categories={categories}>
          <Component {...pageProps} />
        </Layout>
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
