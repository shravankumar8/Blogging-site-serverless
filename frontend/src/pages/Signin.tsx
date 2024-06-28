import { AuthComp } from "../components/Auth";
import Quote from "../components/Quote";

export const Signin = () => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2">
      <div className=" min-h-screen">
        <AuthComp type={"signin"} />
      </div>
      <div className="hidden sm:block">
        <Quote />
      </div>
    </div>
  );
};
