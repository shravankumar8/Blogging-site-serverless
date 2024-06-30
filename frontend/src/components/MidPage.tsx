import  Sideimg  from "../assets/Sideimg.png";
import { useNavigate } from 'react-router-dom';
const MidPage = () => {
    const navigate=useNavigate()
  return (
    <div className="grid  grid-cols-1   sm:grid-cols-3">
      <div className="col-span-2 mx-20 my-16">
        <div className=" font-seri font-bold   text-6xl">
          Human
          <div>stories & ideas</div>
        </div>
        <div className="mt-6">
          A place to read, write, and deepen your understanding
        </div>
        <div>
          <button onClick={()=>{navigate("/blogs")}} className="text-white mt-5 px-4 py-2 rounded-full bg-black text-xs ">
            Start Reading
          </button>
        </div>
      </div>

      <div className="p-1  hidden sm:flex">
        <img width={"300"} src={Sideimg} alt="" />
      </div>
    </div>
  );
}

export default MidPage
