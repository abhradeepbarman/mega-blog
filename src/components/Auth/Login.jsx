import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login as storeLogin } from "../../store/authSlice";
import Logo from "../Common/Logo";
import Input from "../Input";
import Button from "../Button";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setError("");
    const toastId = toast.loading("Loading...")

    try {
      const session = await authService.login(data);
      console.log(session);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
      else {
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      toast.error("Error!")
      setError(error.message);
    }
    finally {
      toast.dismiss(toastId)
    }
  };


  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Login to your account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to={"/signup"}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />


            <Input 
                label="Password: "
                placeholder="Enter your password"
                type="password"
                {...register("password", { required: true })}
            />

            <Button
                type="submit"
                className="w-full"
            >
                Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
