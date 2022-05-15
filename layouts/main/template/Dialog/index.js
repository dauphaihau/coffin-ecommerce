import SearchBar from "./SearchModal";
import LoginRegister from "./LoginRegisterModal";
import AddressDialog from "./AddressDialog";

const AllDialog = () => {
  return (
    <>
      <LoginRegister/>
      <AddressDialog/>
      <SearchBar/>
    </>
  );
}

export default AllDialog;