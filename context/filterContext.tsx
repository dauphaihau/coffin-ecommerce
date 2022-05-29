import {createContext, useContext, useEffect, useReducer, useState} from "react";
import reducer, {filterState, filterType} from '../store/reducers/filterReducer';
import {fetchInventory} from "../utils/provider/inventoryProvider";

const initialState = {
  filtered_products: [],
  all_products: [],
  gridView: true,
  sort: "price-lowest",
  filters: {
    text: "",
    brand: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = createContext<Partial<filterState>>({});

export const FilterProvider = ({children}) => {
  const [products, setProducts] = useState()
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadInit = async () => {
      const products = await fetchInventory();
      if (products) {
        dispatch({type: filterType.LOAD_PRODUCTS, payload: products})
        setProducts(products)
      }
    }
    loadInit()
  }, [])

  useEffect(() => {
    dispatch({type: filterType.FILTER_PRODUCTS});
    dispatch({type: filterType.SORT_PRODUCTS});
  }, [products, state.filters, state.sort])

  const setGridView = () => {
    dispatch({type: filterType.SET_GRIDVIEW});
  };
  const setListView = () => {
    dispatch({type: filterType.SET_LISTVIEW});
  };

  const updateSort = (e) => {
    const value = e.value;
    dispatch({type: filterType.UPDATE_SORT, payload: value});
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'category') {
      value = e.target.textContent.toLowerCase();
    }

    if (name === "color") {
      value = e.target.dataset.color;
    }

    if (name === 'brand') {
      value = e.target.textContent;
    }

    if (name === "price") {
      value = Number(value);
    }
    dispatch({type: filterType.UPDATE_FILTERS, payload: {name, value}})
  }

  const clearFilters = () => {
    dispatch({type: filterType.CLEAR_FILTERS})
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateFilters,
        clearFilters,
        updateSort,
        setGridView,
        setListView
      }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;

export const useFilterContext = () => {
  return useContext(FilterContext);
};
