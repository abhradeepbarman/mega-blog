import { useEffect, useState } from "react"
import {Container, PostForm} from "../components/index"
import { useNavigate, useParams } from "react-router-dom"
import appwriteService from "../appwrite/config"

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    console.log(post)
                    if(post) {
                        setPost(post)
                    }
                })
                .catch((err) => console.log(err))
        }
        else {
            navigate("/")
        }
    }, [slug, navigate])

  return (
    post ? (
    <div className="py-8">
        <Container>
            <PostForm post={post} />
        </Container>
    </div>) : null
  )
}

export default EditPost