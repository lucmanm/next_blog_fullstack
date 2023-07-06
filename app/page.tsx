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
                    <a href={`/blogs/edit/${post.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
                ))}
        </tbody>
    </table>
</div>

    </main>
  )
}
 