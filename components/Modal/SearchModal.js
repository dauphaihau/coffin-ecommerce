import {useEffect, useState} from "react";
import {XIcon, SearchIcon} from "@heroicons/react/solid";

import {useUtil} from "../../context/utilContext";
import Input from "../Input/Input";
import {fetchInventory} from "../../utils/provider/inventoryProvider";
import {slugify} from "../../utils/helpers";
import {DENOMINATION} from "../../utils/settings";
import {Link} from "../index";

const SearchModal = () => {

  const {modalSearchOpen} = useUtil();

  const [inventory, setInventory] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const loadInit = async () => {
      const inventory = await fetchInventory()
      setInventory(inventory)
    }
    loadInit();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = inventory.filter((item) => {
        return Object.values(item.name)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(inventory);
    }
  };

  return (
    <div
      className={`${!modalSearchOpen && 'hidden'}
          fixed top-0 right-0 left-0 z-[200] 
          mx-auto w-[90%] laptop:w-1/2 mt-6 
          `}>
      <Input name='search' autoFocus  onChange={(e) => searchItems(e.target.value)}
             className='!pl-[3.5rem] !h-[60px] '
      />
      <div className="absolute top-[17px] left-[14px]">
        <SearchIcon width={30} height={25}/>
      </div>
      <div className="absolute top-[17px] right-[14px] text-gray-500 hover:text-black cursor-pointer"
           onClick={() => setFilteredResults([])}
      >
        <XIcon width={30} height={25}/>
      </div>
      {
        filteredResults.length !== 0 &&
        <div className="flex flex-col h-auto
          max-h-[500px]
         overflow-y-auto overflow-x-hidden
         rounded-lg bg-white  px-4 overflow-x-hidden">
          <div>
            {

              filteredResults.map((item) => {
                return (
                  <div className="border-t py-4" key={item.id}>
                    <div className="flex">
                      <div className='cursor-pointer w-[43%] ipad:w-auto  relative bg-light rounded-lg p-1'>
                        <img className="h-28 m-0 " src={item.image} alt={item.name}/>
                      </div>
                      <div className='ml-4 w-[65%] flex flex-col justify-center'>
                        <Link href={`/product/${slugify(item.name)}`}>
                          <p className="m-0 text-gray-600 text-[12px]">
                            {item.name}
                          </p>
                        </Link>
                        <div className="flex">
                          <h2 className="text-[12px] laptop:text-2xl font-bold tracking-wide">{DENOMINATION + item.price}</h2>
                          {item.salePrice
                            && <p className="ml-[10px]
                            line-through text-gray-400 font-light text-[12px]
                            ipad:text-base laptop:text-base ps-2">
                              {DENOMINATION + item.salePrice}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </div>
  );
}

export default SearchModal;