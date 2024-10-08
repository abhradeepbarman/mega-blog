import { useSelector } from "react-redux"
import {Container, Logo, LogoutBtn} from "../index"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus
    }
  ]

  return (
    <header className="py-4 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="40px" />
            </Link>
          </div>

          <ul className="flex ml-auto">
            {
              navItems.map((item, index) => 
                item.active && (
                  <li key={index}>
                    <button
                      onClick={() => navigate(item.path)}
                      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-sm md:text-base'
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {
              authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )
            }
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header
