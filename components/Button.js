export default function Button(props) {

  const {
    title,
    type = '',
    className = '',
    children = '',
    ...others
  } = props

  return (
    <button
      className={`btn ${className}`}
      {...others}
    >
      {children}
    </button>
  )
}

