import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate=useNavigate()
  return (
    <div className="m-2  mx-10  flex justify-between">
      <div className="logoDiv font-sans text-xl  tracking-normal text-black font-extrabold">
        Medium
      </div>
      <div className="navbuttons  hidden sm:flex gap-10 justify-center items-center ">
        <ul className="flex text-xs cursor-pointer text-black gap-3">
          <li
            onClick={() => {
              navigate("ourstory");
            }}
            className="cursor-pointer"
          >
            <div
              onClick={() => {
                navigate("/signin");
              }}
            >
              Our Story
            </div>
          </li>
          <li
            onClick={() => {
              navigate("Membership");
            }}
            className="cursor-pointer"
          >
            <div>Membership</div>
          </li>
          <li
            onClick={() => {
              navigate("Write");
            }}
            className="cursor-pointer"
          >
            <div>Write</div>
          </li>
          <li
            onClick={() => {
              navigate("signin");
            }}
            className="cursor-pointer"
          >
            <div>Sign in</div>
          </li>
        </ul>
        <div>
          <button
            onClick={() => {
              navigate("signup");
            }}
            className="text-white px-4 py-2 rounded-full bg-black text-xs "
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="flex text-xl  sm:hidden">☰</div>
    </div>
  );
}

export default NavBar
