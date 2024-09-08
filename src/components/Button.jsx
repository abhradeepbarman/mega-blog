
const Button = ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    disabled = false,
    ...props
}) => {
  return (
    <button className={`px-4 py-2 rounded-lg  ${textColor} ${className} ${disabled ? "bg-blue-300" : bgColor} `} {...props} disabled={disabled} >
      {children}
    </button>
  )
}

export default Button
