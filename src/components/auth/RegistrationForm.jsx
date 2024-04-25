import React from "react";
import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationForm = () => {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (fomrData) => {
    console.log(fomrData);

    try {
        let response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, fomrData)
        if(response.status === 201){
            navigate("/login");
        }
        
    } catch (error) {
        console.error(error);
        setError("root.random", {
            type:"random",
            message:`Something went wrong: ${error.message}`,
        })
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", {
            required: "First Name is requird"
            
          })}
          className={`auth-input ${
            errors.firstName ? "border-red-500" : "border-gray-200"
          }`}
          type="firstName"
          id="firstName"
          name="firstName"
        />
      </Field>

      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName")}
          className={`auth-input ${
            errors.lastName ? "border-red-500" : "border-gray-200"
          }`}
          type="lastName"
          name="lastName"
          id="lastName"
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email is required" })}
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          id="email"
          name="email"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "password is requird",
            minLength: {
              value: 8,
              message: "Password length must be 8 characters long",
            },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          id="password"
          name="password"
        />
      </Field>
          <p>{errors?.root?.random?.message}</p>
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all 
          hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
