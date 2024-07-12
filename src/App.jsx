import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from "./components"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Loader from "./components/Common/Loader"
import Login from "./pages/Login"
import Signup from './pages/Signup';
import AddPost from "./pages/AddPost"
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  // check whether user is logged-in or not
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login(userData))
        }
        else {
          dispatch(logout())
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  if(loading) {
    return (
      <div className="bg-gray-400">
          <Loader className="min-h-screen" />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400" >
      
      <div className="w-full flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/add-post" element={<AddPost />} />
            </Routes>
        </main>
        
        <Footer />
      </div>

      <Toaster />
    </div>
  )
}

export default App









// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: '/',
//         element: <Home />
//       },
//       {
//         path: '/login',
//         element: (
//           <AuthLayout authentication={false}>
//             <Login />
//           </AuthLayout>
//         )
//       },
//       {
//         path: "/signup",
//         element: (
//             <AuthLayout authentication={false}>
//                 <Signup />
//             </AuthLayout>
//         ),
//     },
//     {
//         path: "/all-posts",
//         element: (
//             <AuthLayout authentication>
//                 {" "}
//                 <AllPosts />
//             </AuthLayout>
//         ),
//     },
//     {
//         path: "/add-post",
//         element: (
//             <AuthLayout authentication>
//                 {" "}
//                 <AddPost />
//             </AuthLayout>
//         ),
//     },
//     {
//         path: "/edit-post/:slug",
//         element: (
//             <AuthLayout authentication>
//                 {" "}
//                 <EditPost />
//             </AuthLayout>
//         ),
//     },
//     {
//         path: "/post/:slug",
//         element: <Post />,
//     },
//     ]
//   }
// ])
