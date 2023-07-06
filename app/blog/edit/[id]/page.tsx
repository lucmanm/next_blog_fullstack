"use client"

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
};
// finding the id to update the blog
const updateBlog = async ({title, description, id}: UpdateBlogParams) => {
  const res = fetch(`http://localhost:3000/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title: title, description: description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};
// deleting blog
const deleteBlog = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blogs/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};
// Fetching the data by ID
const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
  const data = await res.json();
  return data.post;
};

const EditBlog = ({ params }: { params: { id: string }}) => {
  const router = useRouter();
  // Declaration types of each ref value
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  // Load the data from database
    useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description,
          toast.success("Fetching Complete", { id: "1" });
          router.push("/")
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching blog", { id: "1" });
      });
  }, []);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request ", { id: "1" });
      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });
      toast.success("Blog Posted Successfully", { id: "1" });
    }
  };

  return (
    <Fragment>
      <Toaster />
      <div className="container mx-auto">
        <form onSubmit={handleSubmit}>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" ref={titleRef} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>
        <div>
            
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea id="message" ref={descriptionRef} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

        </div>
        <div>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-8">Update</button>
        </div>
        </form>
      </div>
    </Fragment>
  );
};

export default EditBlog;