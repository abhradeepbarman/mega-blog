import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // fetch all the posts on the platform
    useEffect(() => {
        setLoading(true);
        appwriteService
            .getAllPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if(posts.length == 0) {
        return(
            <div className="w-full py-8 mt-4 text-center flex justify-center items-center h-full">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Please login to see Blogs ...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
