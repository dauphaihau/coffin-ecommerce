import {useFilterContext} from "../context/filterContext";
import {formatPrice, getUniqueValues, titleIfy} from "../utils/helpers";
import {Button} from "./Button";

const Filters = ({categories, launchSticky}) => {
  const {
    filters: {
      brand,
      category,
      minPrice,
      maxPrice,
      color,
      price,
    },
    all_products,
    updateFilters, clearFilters,
  } = useFilterContext()

  const colors = getUniqueValues(all_products, 'colors')

  return (
    <div className={`${launchSticky && 'laptop:sticky top-[12%] h-[57%]'}`}>
      <div className='mb-8'>
        <h3 className='mb-4 text-xl'>Categories</h3>
        <div>
          {categories?.map(({name}, idz) => (
            <button
              key={idz}
              type='button'
              className={`filterBtn ${category === name && 'is-selected'} `}
              name='category'
              onClick={updateFilters}
            >
              {titleIfy(name)}
            </button>
          ))}
        </div>
      </div>
      <div className='mb-8'>
        <h3 className='mb-4 text-xl'>Brands</h3>
        <div>
          {['Batesville', 'Aurora', 'Astral'].map((name, idz) => (
            <button
              key={idz}
              type='button'
              className={`filterBtn ${brand === name && 'is-selected'} `}
              name='brand'
              onClick={updateFilters}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-8 ">
        <h3 className='mb-4 text-xl'>Colors</h3>
        <div className="flex gap-x-4 ml-[5px] ">
          {colors.map((c, index) => {
            if (c === "all") {
              return (
                <button
                  key={index}
                  name="color"
                  onClick={updateFilters}
                  data-color="all"
                  className={`${
                    color === "all" ? "color-btn color-btn-all active" : "color-btn color-btn-all"
                  }`}
                />
              );
            }
            return (
              <button
                key={index}
                name="color"
                style={{background: c}}
                className={`${color === c ? "color-btn active " : "color-btn"}`}
                data-color={c}
                onClick={updateFilters}
              />
            );
          })}
        </div>
      </div>
      <div className="mb-8">
        <h3 className='mb-2 text-xl'>Price</h3>
        <p className="price">{formatPrice(price)}</p>
        <input
          type="range"
          name="price"
          className='slider'
          value={price}
          min={minPrice}
          max={maxPrice}
          onChange={updateFilters}
        />
      </div>
      <Button className='w-fit hidden laptop:block' onClick={() => clearFilters()}>clear all</Button>
    </div>
  );
}

export default Filters;