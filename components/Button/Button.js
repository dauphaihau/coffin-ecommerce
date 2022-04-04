export default function Button(props) {

  const {
    title,
    type = '',
    className = '',
    css = '',
    children = '',
    ...others
  } = props

  return (
    <button
      className={`btn ${className} ${css}`}
      {...others}
    >
      {children}
    </button>
  )
}

