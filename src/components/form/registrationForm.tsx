import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "./validationSchema";
import { FormData } from "./types";
import { useSubmitForm } from "./useSubmitForm";
import { InputField } from "../input/inputField";
import AlertBanner from "../alert/alertBanner";
import { useUsernameCheck } from "./useUsernameCheck";

const RegistrationForm = () => {
  const [isSuccess, setSuccess] = useState(false);
  const [isSubmitError, setSubmitError] = useState(false);

  const initialFormValues: FormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    reset,
    watch,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registrationSchema),
    defaultValues: initialFormValues,
    mode: "onBlur",
  });

  const mutation = useSubmitForm();

  const username = watch("username");
  const { data: isUsernameAvailable } = useUsernameCheck(username);

  useEffect(() => {
    if (isUsernameAvailable === false) {
      setError("username", {
        type: "manual",
        message: "Username is already taken",
      });
    } else {
      // Clear error when username is available or input is too short
      if (errors.username?.type === "manual") {
        setError("username", { type: "manual", message: "" });
      }
    }
  }, [isUsernameAvailable, setError, errors.username]);

  const onSubmit = (data: FormData) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        reset();
        setSuccess(true);
        console.log("Form submitted successfully:", data);
      },
      onError: (error) => {
        setSubmitError(true);
        console.error("Error submitting form:", error);
      },
    });
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact sales
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <InputField
            label="Username"
            name="username"
            type="text"
            autoComplete="given-name"
            register={register}
            error={errors.username?.message}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            register={register}
            error={errors.email?.message}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword?.message}
          />
        </div>

        <div className="mt-10">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {mutation.isLoading ? "Submitting..." : "Register"}
          </button>
        </div>

        {(isSuccess || isSubmitError) && (
          <AlertBanner
            isError={isSubmitError}
            message={
              isSubmitError
                ? "Something went wrong."
                : "We have received your message. we will contact you soon."
            }
          />
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
