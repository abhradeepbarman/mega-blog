import { Link } from "react-router-dom"
import appwriteService from "../appwrite/config"

const PostCard = ({post}) => {
  const {$id, featuredImage, title} = post

  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4 h-fit">
            <div className="w-full justify-center mb-4">
                <img src={appwriteService.getFilePreview(featuredImage || null)} alt={title} 
                    className="rounded-xl h-[250px] w-full object-cover"
                />
            </div>

            <h2 className="text-xl font-bold"> {title} </h2>
        </div>
    </Link>
  )
}

export default PostCard
