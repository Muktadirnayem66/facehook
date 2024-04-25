import { useForm } from "react-hook-form";
import Field from "../common/Field";
import {useNavigate} from 'react-router-dom'
import useAuth from "../../hooks/useAuth";
import axios from 'axios'


const LoginForm = () => {
    
    const navigate = useNavigate()
    const {setAuth} = useAuth()


  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const submitHandler = async( formdata)=>{

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formdata)
      if(response.status === 200){
        const {user, token} = response.data
        if(token){
          const authToken = token.token;
          const refreshToken = token.refreshToken;
          setAuth({user, authToken, refreshToken})
          navigate("/")
        }
      }
    } catch (error) {
      console.error(error)
      setError("root.random", {
        type:"random",
        message:`User with email ${formdata.email} is not found`
      })
      
    }

  }
  


  
  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Field label="Email" error={errors.email}>
        <input className={`auth-input ${errors.email? "border-red-500" : "border-gray-200"}`}
          {...register("email", { required: "Email is required" })}
          type="email"
          id="email"
          name="email"
        />
      </Field>

      <Field label="Password" error={errors.password}  >
        <input className={`auth-input ${errors.password? "border-red-500" : "border-gray-200"}`} {...register("password", {required:"Password is required", minLength:{
            value:8,
            message:"Password must be at least 8 characters length"
        }})} type="password" id="password" name="password" />
      </Field>

      <p className=" text-red-500">{errors?.root?.random?.message}</p>

      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
