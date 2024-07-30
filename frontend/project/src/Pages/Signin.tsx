
import Quote from "../Components/Quote"
import {Auth} from "../Components/Auth"
function Signin() {

  return (
    <div className='w-full h-screen flex'>
         <div className="w-[50%] h-full">
                <Auth type="signin" />
            </div>
            <div className="w-[50%] h-full">
                <Quote />
            </div>
    </div>

  )
}

export default Signin