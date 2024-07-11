import logo from "../assets/Logo.png"

function Logo({width = "100px"}) {
  return (
    <div>
      <img src={logo} alt="Logo" width={width} />
    </div>
  )
}

export default Logo