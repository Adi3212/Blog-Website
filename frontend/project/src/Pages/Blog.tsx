
import Blogs from '../Components/Blogs';
import { useBlog } from '../hooks';
import { useParams } from 'react-router-dom';
import Spinner from '../Components/Spinner';

function Blog() {
  const { id } = useParams<{ id: string }>(); 

  const { loading, blog } = useBlog(id as string || ''); 

  if (loading) {
    return <div><Spinner></Spinner></div>;
  }

  if (!blog) {
    return <div>Blog not found</div>; 
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Blogs 
        title={blog.title}
        content={blog.content}
      />
    </div>
  );
}

export default Blog;
