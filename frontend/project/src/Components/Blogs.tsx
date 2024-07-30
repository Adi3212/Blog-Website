

interface Blogprop{
  title: string;
  content: string;
}


function Blogs({title, content}: Blogprop) {
  return (
    <div className='w-[60vw] h-[70vh]  flex flex-col justify-start '>
        <div className='mt-20'>
            <h1  className='text-5xl font-bold mb-5' >{title}</h1>
            <h3 className='text-slate-300'>Posted on 2nd feb 2023</h3>
            <h3 className='mt-10'>{content}</h3>

        </div>
        
    </div>
  )
}

export default Blogs