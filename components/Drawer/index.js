import CategoriesDrawer from "./CategoriesDrawer";
import CartDrawer from "./CartDrawer";

const AllDrawer = ({categories}) => {
  return (
    <>
      <CategoriesDrawer categories={categories}/>
      <CartDrawer/>
    </>
  );
}

export default AllDrawer;
