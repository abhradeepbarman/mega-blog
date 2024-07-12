import { PostCard } from "../components/index"
import appwriteService from "../appwrite/config"
import { useEffect, useState } from "react"
import Container from "../components/Container/Container"

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getAllPosts()
            .then((posts) => {
                if(posts) {
                    setPosts(posts.documents)
                }
            })
            .catch((err) => console.log(err))
    }, [])

  return (
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                {
                    posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default AllPosts