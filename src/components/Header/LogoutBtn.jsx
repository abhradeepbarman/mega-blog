import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import authService from './../../appwrite/auth';
import toast from "react-hot-toast";

const LogoutBtn = () => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        const toastId = toast.loading("Logging out...")
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error while logging out!")
        })
        .finally(() => {
          toast.dismiss(toastId)
          location.reload()
        })
    }

  return (
    <button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutBtn
