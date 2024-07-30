import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from './Avatar';
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import {  faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

interface BlogCardProps{
  id: string;
  title: string;
  content: string;
}
function BlogCard({ id,title, content }: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`} className='w-screen h-screen flex justify-center items-center'>
      <div className='w-[50vw] h-[30vh]'>
        <div className='mb-4 flex'>
          <div className='mr-8'>
            <Avatar />
          </div>
          <div className='mt-3'>
            <h3 className='text-sm text-slate-500'>2nd Feb 2021</h3>
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-bold mb-4'>{title}</h1>
          <textarea className='font-light border-0 resize-none overflow-hidden w-full h-[2.5rem]' readOnly >{content}</textarea>
        </div>
        <div className='w-full flex justify-between mt-5'>
          <button className='w-24 h-6 bg-zinc-200 border-2 rounded-2xl'>docker</button>
          <div className='w-28 flex justify-between items-center mr-10'>
            <FontAwesomeIcon icon={faBookmark} />
            <FontAwesomeIcon icon={faCircleMinus} />
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
