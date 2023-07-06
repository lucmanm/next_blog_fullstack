import Link from "next/link";

async function fetchBlogs(){
  const res = await fetch("http://localhost:3000/api/blogs", {
        next:{
          revalidate: 10,
        }})
        const data = await res.json();
        return data.posts;
}

export default async function Home() {
  const posts = await fetchBlogs();
  return ( 
    <main className="container mx-auto mt-8">
     
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {posts?.map((post: any) => (
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={post.id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {post.id}
                </th>
                <td className="px-6 py-4">
                    {post.title}
                </td>
                <td className="px-6 py-4">
                    {post.title}
                </td>
                <td className="px-6 py-4">
                     {new Date(post.date).toDateString()}
                </td>
                <td className="px-6 py-4">
                    <a href={`/blog/edit/${post.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href={`/blog/edit/${post.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                </td>
            </tr>
                ))}
        </tbody>
    </table>
</div>
<div className="relative overflow-x-auto  sm:rounded-lg mt-8 p-2">
    <Link href="/blog/add/">
    <button type="button" className="shadow-md focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">POST</button>
    </Link>
</div>

    </main>
  )
}
 