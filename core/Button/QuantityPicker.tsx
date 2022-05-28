interface QuantityPickerProps {
  increment: () => {},
  decrement: () => {},
  numberOfItems: number,
  theme: string,
  bordered: string,
  size: string,
}

const QuantityPicker = (props: QuantityPickerProps) => {
  const {increment, decrement, numberOfItems, theme = 'black', bordered, size} = props;

  let setTheme;
  let setHover;
  let setSize;

  if (theme === 'black') {
    setTheme = 'bg-black border-black text-white hover:bg-opacity-[0.9]'
    setHover = 'hover:bg-gray-800 hover:text-white'
  }

  if (size === 'sx') {
    setSize = '!w-8 !h-8'
  }

  if (theme === 'white') {
    setTheme = 'bg-white border-[#dde0e3] text-black ';
    setHover = 'rounded-full hover:bg-gray-100 p-[10px] py-[3px] animate';
  }

  return (
    <div className='btn-group'>
      <button className={`${setTheme} ${!bordered && '!border-r-0'}
      ${setSize}
      `} onClick={decrement}>
        {theme === 'black' ? '-' : <span className={`${setHover}`}>-</span>}
      </button>
      <p className={`${setTheme} ${setSize} `}>{numberOfItems}</p>
      <button className={`${setTheme} ${setSize} ${!bordered && '!border-l-0'} `} onClick={increment}>
        {theme === 'black' ? '+' : <span className={`${setHover}`}>+</span>}
      </button>
    </div>
  )
}

export default QuantityPicker