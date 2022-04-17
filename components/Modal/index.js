import SearchModal from "./SearchModal";
import LoginRegisterModal from "./LoginRegisterModal";
import AddressModal from "./AddressModal";

const AllModal = () => {
  return (
    <>
      <LoginRegisterModal/>
      <AddressModal/>
      <SearchModal/>
    </>
  );
}

export default AllModal;