import { AuthComp } from "../components/Auth";
import Quote from "../components/Quote";

export const Signup = () => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2">
      <div className=" min-h-screen">
        <AuthComp type={"signup"} />
      </div>
      <div>
        <Quote />
      </div>
    </div>
  );
};
