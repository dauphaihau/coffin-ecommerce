import {useUtil} from "../../context/utilContext";

const Drawer = () => {
  const {drawerOpen} = useUtil();

  return (
    <aside className={`drawer ${drawerOpen && 'open'}`}>
      <h1>Hi, I'm drawer</h1>
    </aside>
  );
}

export default Drawer


