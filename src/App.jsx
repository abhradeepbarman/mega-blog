import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddPost from "./pages/AddPost";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./components/AuthLayout";
import AllPosts from "./pages/AllPosts";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";

const App = () => {
    const dispatch = useDispatch();

    // check whether user is logged-in or not
    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full flex flex-col min-h-screen">
                <Header />

                <main className="flex-1">
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <AuthLayout authentication={false}>
                                    <Signup />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <AuthLayout authentication={false}>
                                    <Login />{" "}
                                </AuthLayout>
                            }
                        />

                        <Route path="/" element={<Home />} />

                        <Route
                            path="/add-post"
                            element={
                                <AuthLayout>
                                    <AddPost />
                                </AuthLayout>
                            }
                        />

                        <Route
                            path="/all-posts"
                            element={
                                <AuthLayout>
                                    <AllPosts />
                                </AuthLayout>
                            }
                        />

                        <Route
                            path="/post/:slug"
                            element={
                                <AuthLayout>
                                    <Post />
                                </AuthLayout>
                            }
                        />

                        <Route
                            path="/edit-post/:slug"
                            element={
                                <AuthLayout>
                                    <EditPost />
                                </AuthLayout>
                            }
                        />
                    </Routes>
                </main>

                <Footer />
            </div>

            <Toaster />
        </div>
    );
};

export default App;
