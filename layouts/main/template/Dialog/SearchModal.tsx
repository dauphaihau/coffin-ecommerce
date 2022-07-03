import {useEffect, useRef, useState} from "react";

import {useUIController} from "../../../../context/UIControllerContext";
import {fetchInventory} from "../../../../utils/provider/inventoryProvider";
import {slugify} from "../../../../utils/helpers";
import {DENOMINATION} from "../../../../utils/enums";
import {Link, Text} from "../../../../core";
import {Input} from "../../../../core/Input";
import {Col, Row} from "../../../../core/Layout";

const SearchModal = () => {
  const {openSearchModal} = useUIController();
  const inputRef = useRef('');
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

  useEffect(() => {
    inputRef.current.focus();
    setFilteredResults([])
  }, [openSearchModal])

  const searchItems = (searchValue) => {
    console.log('search-value', searchValue)
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
      className={`${!openSearchModal && 'hidden'}
          fixed inset-0 z-[200] 
          mx-auto w-[90%] laptop:w-1/2 mt-6 
          h-fit
          `}>
      <Input
        name='search'
        ref={inputRef}
        // defaultValue=''
        // onChange={(n, v) => console.log('abc')}
        onChange={(n, v) => searchItems(v)}
        classes='!pl-[3rem] h-[60px] '
        clearable
        clas

        contentLeft={
            <i className="fa-solid fa-magnifying-glass text-xl"/>
        }
      />
      {/*<div className="absolute top-[11px] left-[18px]">*/}
      {/*  <i className="fa-solid fa-magnifying-glass text-xl"/>*/}
      {/*</div>*/}
      {/*<div className="absolute top-[12px] right-[14px] text-gray-500 hover:text-black cursor-pointer"*/}
      {/*     onClick={() => setFilteredResults([])}>*/}
      {/*  <i className='fa-solid fa-x text-base mr-3 '/>*/}
      {/*</div>*/}
      {
        filteredResults.length !== 0 &&
        <Col classes="h-auto
          max-h-[500px]
         overflow-y-auto overflow-x-hidden
         rounded-lg bg-white  px-4 overflow-x-hidden">
          <div>
            {
              filteredResults.map((item) => {
                return (
                  <div className="border-t py-4" key={item.id}>
                    <Row>
                      <div className='cursor-pointer w-[43%] ipad:w-auto  relative bg-light rounded-lg p-1'>
                        <img className="h-28 m-0 w-[10rem]" src={item.image} alt={item.name}/>
                      </div>
                      <Col justify='center' classes='ml-4 w-[65%]'>
                        <Link href={`/product/${slugify(item.name)}`}>
                          <Text h1 sx='[17px]' classes="m-0 text-gray-600">
                            {item.name}
                          </Text>
                        </Link>
                        <Row>
                          {item.salePrice ?
                            <>
                              <Text sx='[12px]' lg='2xl' weight='bold'
                                    classes="tracking-wide">{DENOMINATION + item.salePrice}</Text>
                              {
                                item.price
                                &&
                                <Text sx='[12px]' md='base' classes='ml-[10px] line-through text-gray-400'
                                      weight='light'>
                                  {DENOMINATION + item.price}</Text>
                              }
                            </>
                            : <Text sx='[12px]' lg='2xl' weight='bold'
                                    classes="tracking-wide">{DENOMINATION + item.price}</Text>
                          }
                        </Row>
                      </Col>
                    </Row>
                  </div>
                )
              })
            }
          </div>
        </Col>
      }
    </div>
  );
}

export default SearchModal;