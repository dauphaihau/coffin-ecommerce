import '../styles/globals.scss'
import fetchCategories from "../utils/provider/categoryProvider";
import {UtilProvider} from "../context/utilContext";
import {AuthProvider} from "../context/authContext";
import FilterProvider from "../context/filterContext";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";

function Ecommerce({Component, pageProps, categories}) {

  const Layout = Component.layout === 'admin' ? AdminLayout : MainLayout;

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