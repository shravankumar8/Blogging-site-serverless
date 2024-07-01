import WriterNavbar from "../components/WriterNavbar"
import React, { useState, useRef, useEffect } from "react";
const Write = () => {
     const [title, setTitle] = useState("");
     const [content, setContent] = useState("");
     const titleRef = useRef(null);
     const contentRef = useRef(null);

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
    <div>
      <WriterNavbar />
      <div
        className="flex mt-6 flex-col justify-center
       mx-auto max-w-xl  overflow-x-auto"
      >
        <div>
          <textarea
            value={title}
            style={{ height: "auto" }}
            ref={titleRef}
            rows={1}
            onChange={handleTitleChage}
            // className="text-3xl leading-9 outline-none bg-transparent font-normal"
            className=" resize-none bg-transparent  overflow-hidden   row-auto text-2xl text-gray-800
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
            className=" bg-transparent resize-none overflow-hidden  tracking-wide row-auto text-sm font-normal text-gray-800
              outline-none  w-full"
            // type="text"
            placeholder="Title"
          />
        </div>
      </div>
    </div>
  );
};

export default Write;
