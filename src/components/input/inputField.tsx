import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "../form/types";

interface InputFieldProps {
  label: string;
  name: keyof FormData;
  type: string;
  register: UseFormRegister<FormData>;
  autoComplete?: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  register,
  autoComplete,
  error,
}) => {
  return (
    <div className="sm:col-span-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2.5">
        <input
          {...register(name)}
          id={name}
          type={type}
          name={name}
          autoComplete={autoComplete ?? ""}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
