import { useForm } from "react-hook-form";
import RTE from "../RTE";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import { useCallback, useEffect, useState } from "react";
import Select from "../Select";
import Input from '../Input';
import Button from './../Button';
import toast from "react-hot-toast";

function PostForm({ post }) {
  console.log(post);
  
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]/g, "") // Remove all non-alphanumeric characters except spaces
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
    }

    return "";
  }, []);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: slugTransform(post?.title) || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    const toastId = toast.loading("Post uploading...")
    setLoading(true)

    try {
      if(!post) {
        //create new post
        const file = await appwriteService.fileUpload(data.image[0]);
  
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          
          const dbPost = await appwriteService.createPost({
            ...data,
            status: data.status == "0" ? "active" : "inactive",
            userId: userData.$id,
          });
  
          if (dbPost) {
            toast.success("Blog uploaded Successfully!")
            navigate(`/post/${dbPost.$id}`);
          }
          else {
            toast.error("Error while uploading Blog")
          }
        }
        else {
          toast.error("Error while uploading Image")
        }
      }
      else {
        //TODO: update post
        const file = data.image[0] ? await appwriteService.fileUpload(data?.image[0]) : null;
  
        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }
  
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          status: data.status == "0" ? "active" : "inactive",
          featuredImage: file ? file.$id : null,
        });
  
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } 
    } 
    catch (error) {
      console.log(error);
      toast.error("Error!")
    } 
    finally {
      toast.dismiss(toastId)
      setLoading(false)
    } 
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      
      <div className="w-2/3 px-2">
        
        {/* Title  */}
        <Input
          label="Title* :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
          onChange={(e) => {
            setValue("slug", slugTransform(e.target.value));
          }}
        />

        {/* Slug  */}
        <Input
          label="Slug* :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
        />

        {/* Text Editor  */}
        <RTE
          label="Content (255 characters) :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />

      </div>

      <div className="w-1/3 px-2">

        {/* Image upload section  */}
        <Input
          label="Featured Image* :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {/* if user came for edit, show him the image preview  */}
        {
          post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )
        }

        {/* Publish status  */}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          value={getValues("status")} 
          {...register("status", { required: true })}
        />
        
        {/* submit button  */}
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
          disabled={loading}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>

    </form>
  );
}

export default PostForm;
