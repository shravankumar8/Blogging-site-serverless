import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { json } from "react-router-dom";
import Loading from "./Loading";

interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: {
    email: string;
    name: string;
    id: number;
  };
}

const MainBlog = ({ id }: { id: string | undefined }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blogInfo, setBlogInfo] = useState<Blog>({
    id: 0,
    title: "",
    content: "",
    createdAt: "",
    author: {
      email: "",
      name: "",
      id: 0,
    },
  });

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogInfo(response.data.post);
        console.log(response.data.post);
        setIsLoading(false);
      });
  }, [id]);
  if (isLoading) {
    return (
        <Loading />
    );
  }
  console.log(blogInfo);
  return (
    <div
      id="parentDiv"
      className="flex flex-col justify-center mx-auto max-w-xl"
    >
      <div id="titlediv" className="text-4xl font-bold leading-10">
        {blogInfo.title}
      </div>
      <div
        id="bloginfo"
        className="flex border-t border-b py-3 border-gray-500 mt-4 gap-4  items-center "
      >
        <div className=" ">
          <Avatar authorName={blogInfo.author.name} />
        </div>
        <div className="flex text-xs  mt-auto flex-col">
          <div className="flex items-center gap-3">
            <div className="text-black"> {blogInfo.author.name}</div>
            <Chukka />
            <div className="text-xs cursor-pointer text-red-500">Follow</div>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <div>{"Published on " + blogInfo.createdAt?.split("T")[0]}</div>

            <Chukka />
            <div>
              {Math.ceil(blogInfo.content.length / 350) + " minute(s) of read"}
            </div>
          
          </div>
        </div>
      </div>
      <div
        id="content "
        className="break-keep  font-serif text-base mt-8 font-normal leading-7 indent-8"
      >
        {blogInfo.content}
      </div>
    </div>
  );
};

export default MainBlog;
function Avatar({ authorName }: { authorName: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
        {authorName[0]}
      </span>
    </div>
  );
}
function Chukka(){
  return (
    <div style={{width:"3px",height:"3px",backgroundColor:"black",borderRadius:"50px"}}>
      
    </div>
  )
}