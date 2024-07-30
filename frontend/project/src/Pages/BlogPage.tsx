import Appbar from "../Components/Appbar";
import BlogCard from "../Components/BlogCard";
import Spinner from "../Components/Spinner";
import { useBlogs } from "../hooks";

function BlogPage() {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return <div><Spinner></Spinner></div>;
  }

  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div className="w-screen h-screen flex flex-col items-center">
        {blogs.map(blog => (
          <BlogCard 
            id={blog.id}
            title={blog.title}
            content={blog.content}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
