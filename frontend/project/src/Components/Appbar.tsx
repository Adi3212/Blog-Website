
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedium } from '@fortawesome/free-brands-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import {  faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function Appbar() {
  const navigate = useNavigate()
  function handleClick(){
    navigate('/create')
  }
  function handleClick2(){
    navigate('/blogs')
  }

  return (
    
    <div className=' w-full h-[10vh] border-b flex  justify-between  items-center'>
      <div className='ml-[5%]'>
        <FontAwesomeIcon icon={faMedium} className='text-6xl' />
      </div>
      <div className='w-[30%] h-full flex justify-between mr-10 items-center '>
      <button  onClick={handleClick2}    className='w-40 h-8  bg-green-500 border-2 rounded-3xl text-white'>Home</button>
        <button  onClick={handleClick}    className='w-40 h-8  bg-green-500 border-2 rounded-3xl text-white'>Publish</button>
        <FontAwesomeIcon icon={faBell} className='text-2xl' />
        <FontAwesomeIcon icon={faEllipsisH} className='text-2xl' />
      </div>

     
    </div>
  )
}

export default Appbar;
