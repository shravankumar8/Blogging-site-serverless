import { useNavigate } from 'react-router-dom';

const Footbar = () => {
  const navigate=useNavigate()
  return (
    <div>

      <ul className="flex mx-40 mt-2  text-sm text-gray-500 justify-between">
        <li  className='cursor-pointer'><div onClick={()=>{navigate("help")}}>Help</div> </li>
        <li  className='cursor-pointer'><div onClick={()=>{navigate("status")}}>Status</div> </li>
        <li  className='cursor-pointer'><div onClick={()=>{navigate("about")}}>About</div> </li>
        <li  className='cursor-pointer'><div onClick={()=>{navigate("careers")}}>Careers</div> </li>
        <li  className='cursor-pointer'><div onClick={()=>{navigate("press")}}>Press</div> </li>
        <li  className='cursor-pointer'><div onClick={()=>{navigate("privacy")}}>Privacy</div> </li>
        <li  className='cursor-pointer'><div onClick={()=>{navigate("terms")}}>Terms</div> </li>
        <li  className='cursor-pointer'><div onClick={()=>{navigate("text")}}>Text</div> </li>
        <li  className='cursor-pointer'><div onClick={()=>{navigate("to")}}>to</div> </li>
        <li  className='cursor-pointer'><div onClick={()=>{navigate("speech")}}>speech</div> </li>
        <li  className='cursor-pointer'><div onClick={()=>{navigate("teams")}}>Teams</div> </li>
      </ul>
    </div>
  );
}

export default Footbar;