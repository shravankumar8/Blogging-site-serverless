import { useNavigate } from "react-router-dom";

const Blogcard = ({
  id,
  title,
  content,
  publishedDate,
  authorId,
  authorName
}: BlogInputTypes) => {
  const navigate = useNavigate()
  return (
    <div className="border-b-2">
      <div
        onClick={() => {
          navigate("/user/" + authorId);
        }}
        className="flex 	 cursor-pointer gap-2 items-center font-normal "
      >
        <div className="avatardiv">
          <Avatar authorName={authorName} />
        </div>

        <div className="authornamediv text-xs">{authorName}</div>
      </div>
      <div onClick={()=>{
        navigate("/blog/"+id)
      }} className="cursor-pointer">
        <div className="font-semibold mt-2 px-2 text-sm titlediv">{title}</div>
        <div className=" text-xs text-slate-600 px-2 titlediv">
          {content.slice(0, 200) + "..."}
        </div>
        <div className="flex gap-2">
          <div
            style={{
              fontSize: "10px",
            }}
            className="footbar  px-2  mt-3  text-slate-600"
          >
            {publishedDate}
          </div>
          <div
            style={{
              fontSize: "10px",
            }}
            className="footbar pb-2 px-2  mt-3  text-slate-600"
          >
            {Math.ceil(content.length / 350) + " minute(s) of reading"}
          </div>
        </div>
      </div>
    </div>
  );
};

function Avatar({ authorName }: { authorName: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-4 h-4 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-xs text-gray-600 dark:text-gray-300">
        {authorName[0]}
      </span>
    </div>
  );
}

interface BlogInputTypes {
  id:string;
  title: string;
  content: string;
  publishedDate: string;
  authorId: string;
  authorName: string;
}
export default Blogcard;
