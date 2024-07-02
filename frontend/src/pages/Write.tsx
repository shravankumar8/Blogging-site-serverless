import axios from "axios";
import WriterNavbar from "../components/WriterNavbar";
import React, { useState, useRef, useEffect } from "react";
import { BACKEND_URL } from "../config";
import loading1 from "../assets/spinner1.gif";
import loading2 from "../assets/spinner2.gif";
import Loading from "../components/Loading";
import successImg from "../assets/success3.gif";
const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [id,setId]=useState<string>("")

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const handlePublish = () => {
    setIsLoading(true);
    axios
      .post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);

        setIsSuccess(true);
        setIsLoading(false);
        setId(response.data.postId);
        console.log(id)
        if (response.data.postid) {
          return <div>this is cool isnt it ? yaar phuck you</div>;
        }
      });
  };
  const handleTitleChage = (e) => {
    setTitle(e.target.value);
  };
  const contentChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (titleRef.current) {
      // Reset the height to auto to shrink the textarea while deleting content
      titleRef.current.style.height = "auto";
      // Set the height to the scroll height
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [title]);
  useEffect(() => {
    if (contentRef.current) {
      // Reset the height to auto to shrink the textarea while deleting content
      contentRef.current.style.height = "auto";
      // Set the height to the scroll height
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="">
      <WriterNavbar />
      <div
        className="flex   mt-6 flex-col justify-center
       mx-auto max-w-xl  overflow-x-auto"
      >
        <div>
          <textarea
            style={{ height: "auto" }}
            ref={titleRef}
            rows={1}
            onChange={handleTitleChage}
            // className="text-3xl leading-9 outline-none bg-transparent font-normal"
            className=" resize-none bg-transparent  overflow-hidden   row-auto text-3xl mb-4 font-sans text-gray-800
             leading-9 outline-none  w-full"
            // type="text"
            placeholder="Title"
          />
        </div>

        <div>
          <textarea
            value={content}
            style={{ height: "auto" }}
            ref={contentRef}
            rows={1}
            onChange={contentChange}
            // className="text-3xl leading-9 outline-none bg-transparent font-normal"
            className=" bg-transparent resize-none overflow-hidden mb-8  tracking-wide row-auto text-sm font-normal text-gray-800
              outline-none  w-full"
            // type="text"
            placeholder="Title"
          />
        </div>
        <div className="px-6 py-4 gap-3 buttom-1 right-3 fixed bottom-3 flex-col justify-center mb-6 border-2 rounded-3xl flex">
          <button
            onClick={handlePublish}
            className="text-white px-4 py-2 rounded-full bg-black text-xs "
          >
            ✉ Publish
          </button>
          {/* <button className="text-white px-4 py-2 rounded-full bg-black text-xs ">
            <a
              className="twitter-share-button"
              href="https://twitter.com/intent/tweet"
            >
              𝕏 Tweet
            </a>
          </button> */}
          <button className="text-white px-4 py-2 rounded-full bg-black text-xs ">
            ✉ Draft
          </button>
          <Handlesucces
            id={id}
            setIsSuccess={setIsSuccess}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default Write;

const Handlesucces = ({
  id,
  isSuccess,
  isLoading,
  setIsSuccess,
}: {
  id:string;
  setIsSuccess: (isSuccess: boolean) => void;
  isSuccess: boolean;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="  max-w-12   flex self-start items-center ">
        <img src={loading2} alt="" />
      </div>
    );
  }
  if (isSuccess) {
    setInterval(() => {
      setIsSuccess(false);
      window.location.href = `/blog/${id}`;


    }, 2000);

    return (
      <div className="  max-w-16   flex self-start items-center ">
        <img src={successImg} alt="" />
      </div>
    );
  }
};
