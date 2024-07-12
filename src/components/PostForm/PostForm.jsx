import { useForm } from "react-hook-form";
import RTE from "../RTE";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import { useCallback, useEffect } from "react";
import Select from "../Select";
import Input from '../Input';
import Button from './../Button';

function PostForm({ post }) {
  // console.log("post", post);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.title || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  const submit = async (data) => {
    if (post) {
      //update
      const file = (await data.image[0])
        ? appwriteService.fileUpload(data?.image[0])
        : null;

      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : null,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      //create new post
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

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
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
          onChange={(e) => {
            setValue("slug", slugTransform(e.target.value));
          }}
        />

        {/* Slug  */}
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
        />

        {/* Text Editor  */}
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />

      </div>

      <div className="w-1/3 px-2">

        {/* Image upload section  */}
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["Active", "Inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        
        
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>

    </form>
  );
}

export default PostForm;
