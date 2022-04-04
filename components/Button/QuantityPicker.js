const QuantityPicker = (props) => {
  const {increment, decrement, numberOfItems, theme = ''} = props;

  let setBlack;
  if (theme === 'black') {
    setBlack = 'bg-black border-black text-white hover:bg-opacity-[0.9]'
  }

  return (
    <div className='btn-group'>
      <button className={`${setBlack}`} onClick={decrement}>
        -
      </button>
      <p className={`${setBlack}`}>{numberOfItems}</p>
      <button className={` ${setBlack} `} onClick={increment}>
        +
      </button>
    </div>
  )
}

export default QuantityPicker