import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
  LOAD_PRODUCTS, SET_GRIDVIEW, SET_LISTVIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  UPDATE_SORT
} from "../store/actions";
import reducer from '../store/reducers/filterReducer';
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

const FilterContext = createContext();

export const FilterProvider = ({children}) => {
  const [products, setProducts] = useState()
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadInit = async () => {
      const products = await fetchInventory();
      if (products) {
        dispatch({type: LOAD_PRODUCTS, payload: products})
        setProducts(products)
      }
    }
    loadInit()
  }, [])

  useEffect(() => {
    dispatch({type: FILTER_PRODUCTS});
    dispatch({type: SORT_PRODUCTS});
  }, [products, state.filters, state.sort])

  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW});
  };
  const setListView = () => {
    dispatch({type: SET_LISTVIEW});
  };

  const updateSort = (e) => {
    const value = e.value;
    dispatch({type: UPDATE_SORT, payload: value});
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
    dispatch({type: UPDATE_FILTERS, payload: {name, value}})
  }

  const clearFilters = () => {
    dispatch({type: CLEAR_FILTERS})
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
