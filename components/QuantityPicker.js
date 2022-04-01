const QuantityPicker = (props) => {
  const {increment, decrement, numberOfItems, theme = ''} = props;

  let setBlack;
  if (theme === 'black') {
    setBlack = 'bg-black border-black text-white hover:bg-opacity-[0.9]'
  }

  return (
    <div className='flex items-center'>
      <button
        className={`
        w-10 h-10 text-xl
        md:w-8 md:h-8 md:text-sm
        cursor-pointer text-center border pb-.5
        rounded-tl-lg
        transition ease-in-out duration-300
        rounded-bl-lg
        hover:bg-gray-900 hover:text-white
        focus:outline-none
        ${setBlack}
        `}
        onClick={increment}
      >+
      </button>
      <p className={`
        w-10 h-10 pt-2 text-base
        md:w-8 md:h-8 md:pt-2 md:text-xs
        m-0 border-t border-b text-center
         ${setBlack}`}
      >{numberOfItems}</p>
      <button
        className={`
        rounded-tr-lg
        rounded-br-lg
        w-10 h-10 text-2xl
        md:w-8 md:h-8 md:text-sm
        transition ease-in-out duration-300
        cursor-pointer text-center border pb-.5
        hover:bg-gray-900 hover:text-white
        focus:outline-none
        ${setBlack}
        `}
        onClick={decrement}>-
      </button>
    </div>
  )
}

export default QuantityPicker