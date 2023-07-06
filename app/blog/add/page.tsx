"use client"

import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const postBlog = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
  const res = fetch("http://localhost:3000/api/blogs", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const AddBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request ", { id: "1" });
      await postBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
      });
      toast.success("Blog Posted Successfully", { id: "1" });
      router.push("/")
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
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-8">Submit</button>
        </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddBlog;