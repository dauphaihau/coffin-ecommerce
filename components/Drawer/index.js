import MenuDrawer from "./NavDrawer";
import CartDrawer from "./CartDrawer";

const AllDrawer = ({categories}) => {
  return (
    <>
      <MenuDrawer categories={categories}/>
      <CartDrawer/>
    </>
  );
}

export default AllDrawer;
