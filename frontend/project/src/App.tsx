import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Signin from './Pages/Signin'
import { Signup } from './Pages/Signup'
import Blog from './Pages/Blog'
import {Auth} from './Components/Auth'
import BlogPage from './Pages/BlogPage'
import { Publish } from './Pages/Publish'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="/" element={<Signin></Signin>} />
          <Route path="/blog/:id" element={<Blog></Blog>} />
          <Route path='/blogs' element={<BlogPage></BlogPage>}></Route>
          <Route path='/create' element={<Publish></Publish>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App