import { ChangeEvent,  } from 'react'
interface LabledInput {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) =>void;

  isPassword: boolean;
}
export  const InputComp = ({
  label,placeholder ,onChange,isPassword}:LabledInput) => {
  return (
    <div>
      <label className="block mb-2 mt-2 text-sm font-medium  text-black">
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={isPassword ? "password" : "text"}
        onChange={onChange}
        className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
  );
};


