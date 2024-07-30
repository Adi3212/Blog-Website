import Quote from "../Components/Quote"
import {Auth} from "../Components/Auth"
export function Signup() {




  return (
    <div className='w-full h-screen flex'>
         <div className="w-[50%] h-full">
                <Auth type="signup" />
            </div>
            <div className="w-[50%] h-full">
                <Quote />
            </div>
    </div>
  );
}

export default Signup;


