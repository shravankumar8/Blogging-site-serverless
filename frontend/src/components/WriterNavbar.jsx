import { useNavigate } from "react-router-dom";

const WriterNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="m-2  mx-10  flex justify-between">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="logoDiv cursor-pointer font-sans text-xl  tracking-normal text-black font-extrabold"
      >
        Medium
      </div>
      <div className="navbuttons  hidden sm:flex gap-10 justify-center items-center ">
        <ul className="flex text-xs cursor-pointer text-black gap-3">
         
          <li
            onClick={() => {
              navigate("notifications");
            }}
            className="cursor-pointer"
          >
            <div className="text-sm border p-1 rounded-lg"> 🕭</div>
          </li>
          <li
            onClick={() => {
              navigate("profile");
            }}
            className="cursor-pointer border p-1 rounded-lg"
          >
            <div>profile🗿</div>
          </li>
          <li
            onClick={() => {
              navigate("profile");
            }}
            className="cursor-pointer border p-1 rounded-lg"
          >
            <div>Share ➢</div>
          </li>
          <li
            onClick={() => {
              navigate("profile");
            }}
            className="cursor-pointer border p-1 rounded-lg"
          >
            <div>Draft ✉</div>
          </li>
        </ul>
        <div>
          <button
            onClick={() => {
              navigate("/blog/write");
            }}
            className="text-white px-4 py-2 rounded-full bg-black text-xs "
          >
            ✉ Publish
          </button>
        </div>
      </div>
      <div className="flex text-xl  sm:hidden">☰</div>
    </div>
  );
};

export default WriterNavbar;
