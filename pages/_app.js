import '../assets/styles/global.scss'
import fetchCategories from "../utils/provider/categoryProvider";
import {AuthProvider} from "../context/authContext";
import FilterProvider from "../context/filterContext";
import AdminLayout from "../layouts/admin/template";
import {UIControllerProvider} from "../context/UIControllerContext";
import {MainLayout} from "../layouts/main/template";

function Ecommerce({Component, pageProps, categories}) {

  const Layout = Component.layout === 'admin' ? AdminLayout : MainLayout;

  return (
    <AuthProvider>
      <UIControllerProvider>
        <FilterProvider>
          <Layout categories={categories}>
          {/*<MainLayout categories={categories}>*/}
            <Component {...pageProps} />
          {/*</MainLayout>*/}
          </Layout>
        </FilterProvider>
      </UIControllerProvider>
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