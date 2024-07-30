import Title from "../Components/Title";
import Content from "../Components/Content";
import Appbar from "../Components/Appbar";
import { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../Backend";
export function Publish() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClick = async() => {
    console.log("Title: ", title);
    console.log("Content: ", content);

    try {
      const response =  await axios.post(`${BACKEND_URL}/api/v1/post/blog`, {
        title,
        content
      },
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      if (!response.data) {
        console.log("No response");
      }
      setTitle("");
      setContent("");
      console.log(response.data);
      console.log(response);
      
      
    } catch (error) {
      console.log(error);
      
    }

  }


  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="mt-10 w-full flex justify-center">
          <div className="w-3/4 flex items-center space-x-4">
            <Title value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button  onClick={handleClick}  className="ml-10 w-40 h-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              Create Blog
            </button>
          </div>
        </div>
        <div className="mt-10 w-3/4">
          <Content value={`${content}`}  onChange={(e)=>(setContent(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
