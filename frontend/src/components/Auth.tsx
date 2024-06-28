import { Link, Navigate, useNavigate } from "react-router-dom";
import { InputComp } from "./InputComp";
import { useState } from "react";
import { signinInput, signupInput } from "@shravankumar8/medium-common";
import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "../config";
export const AuthComp = ({ type }: { type: "signin" | "signup" }) => {
  const navigate=useNavigate()
  const [authInputes, setAuthInputes] = useState<signupInput|signinInput>({
    email: "",
    password: "",
    name: "", 
  });

  async function sendRequest(){
try {

  const response: AxiosResponse = await axios.post(
    `${BACKEND_URL}/api/v1/user/signup`,
    {
      ...authInputes,
    }
  );
  const jwt:string=response.data
  console.log("response"+response)
  localStorage.setItem("Authorization",jwt)
  if(response.status !== 200){
    alert("error while signingup")
  }
  navigate("/blog")  
} catch (error) {
  console.log(error)
  alert("error while signing up")
}

    console.log("Sending request")
  }

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
              setAuthInputes({ ...authInputes, name: e.target.value });
            }}
          />
        )}

        <InputComp
          label={"Email Address"}
          placeholder={"Email"}
          isPassword={false}
          onChange={(e) => {
            setAuthInputes({ ...authInputes, email: e.target.value });
            console.log(e.target.value);
          }}
        />

        <InputComp
          label={"Password"}
          placeholder={"Password"}
          isPassword={false}
          onChange={(e) => {
            setAuthInputes({ ...authInputes, password: e.target.value });
          }}
        />
        {JSON.stringify(authInputes)}
        {type === "signin" ? <ForgotComp /> : <></>}

        <button
          onClick={sendRequest}
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
