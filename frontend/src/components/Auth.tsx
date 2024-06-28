import { Link } from "react-router-dom";
import { InputComp } from "./InputComp";
import { useState } from "react";
import { signinInput, signupInput } from "@shravankumar8/medium-common";

export const AuthComp = ({ type }: { type: "signin" | "signup" }) => {
  const [authInputes, setAuthInputes] = useState<signupInput|signupInput>({
    email: "",
    password: "",
    name: "", 
  });

  function sendRequest(){}

  return (
    <div className="justify-center ">
      <div className=" h-screeen  mt-5 w-full flex items-center  flex-col  ">
        <div className="text-black font-extrabold  text-3xl">
          {type === "signin" ? "Welcome back " : "Create new account"}
        </div>
        <div className="text-sm flex flex-row gap-1  text-slate-400">
          {type === "signin"
            ? "Create new account ?"
            : "Already have an account ?"}
          <Link
            className="underline"
            to={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "signup" : "signin"}
          </Link>
        </div>
        {type === "signin" ? (
          <></>
        ) : (
          <InputComp
            label={"First Name"}
            placeholder={"Name"}
            isPassword={false}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        )}

        <InputComp
          label={"Email Address"}
          placeholder={"Email"}
          isPassword={false}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />

        <InputComp
          label={"Password"}
          placeholder={"Password"}
          isPassword={false}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        {type === "signin" ? <ForgotComp /> : <></>}

        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4  font-medium rounded-lg text-sm px-10 py-2 me-2 mb-2 mt-5  "
        >
          {type === "signin" ? "signin" : "signup"}
        </button>
      </div>
    </div>
  );
};

function ForgotComp() {
  return (
    <div className="text-sm   text-slate-400">
      <Link to="forgotPassword">forgot password?</Link>
    </div>
  );
}
