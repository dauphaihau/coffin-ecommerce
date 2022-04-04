import React, {useEffect, useState} from "react";
import Link from "next/link";

import {useUtil} from "../../context/utilContext";
import Input from "../Input/Input";
import {fetchInventory} from "../../utils/provider/inventoryProvider";
import {slugify} from "../../utils/helpers";
import {XIcon, SearchIcon} from "@heroicons/react/solid";
import {DENOMINATION} from "../../utils/settings";

const SearchModal = () => {

  const {modalSearchOpen} = useUtil();

  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const loadInit = async () => {
      const inventory = await fetchInventory()
      setAPIData(inventory)
    }
    loadInit();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item.name)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <div
      className={`${!modalSearchOpen && 'hidden'}
          fixed top-0 right-0 left-0
           z-[200] w-[380px] ipad:w-[700px] laptop:w-[930px] 
           left-[5%]
            top-[3%] ipad:left-[4%]
            laptop:left-[23%] 
           justify-center items-center`}>
      <Input name='search' onChange={(e) => searchItems(e.target.value)}
             className='!pl-[3.5rem] !h-[60px] !focus:ring-white !focus:border-white'
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
         h-[700px] max-h-[500px]
         overflow-y-auto overflow-x-hidden
         rounded-lg bg-white  px-4 overflow-x-hidden">
          <div>
            {
              filteredResults.map((item) => {
                console.log('item', item)
                return (
                  <div className="border-t py-4" key={item.id}>
                    <div className="flex">
                      <div className='cursor-pointer relative bg-light rounded-lg p-1'>
                        <img className="h-28 m-0" width={200} src={item.image} alt={item.name}/>
                      </div>
                      <div className='ml-4 w-[65%]'>
                        <Link href={`/product/${slugify(item.name)}`}>
                          <a aria-label={item.name}>
                            <p className="m-0 text-gray-600 w-80 text-smaller">
                              {item.name}
                            </p>
                          </a>
                        </Link>

                        <div className="flex">
                          <h2 className="text-2xl font-bold tracking-wide">{DENOMINATION + item.price}</h2>
                          {item.salePrice
                            && <p className="ml-[10px] text-base
                            line-through text-gray-400 font-light text-sm
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