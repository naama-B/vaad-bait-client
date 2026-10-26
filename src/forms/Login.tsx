import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contextUser";
const schema=yup.object({
    email: yup.string().required("שדה חובה").email("מייל לא תקין"),
    password : yup.string().required("שדה חובה").min(6,"הסיסמה צריכה להיות באורך של 6 תווים לפחות"),
}).required()
const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {  email: "" , password: ""},
    mode: "all",
    resolver: yupResolver(schema),
  });

  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit=async(data:yup.InferType<typeof schema>)=>{
      try{
      await login(data)
      navigate("/");
    }
    catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401)
            setErrorMsg('אימייל או סיסמה שגויים')
        else if (axios.isAxiosError(err) && !err.response)
            setErrorMsg('אין חיבור לשרת, נסו שוב מאוחר יותר')
        else if (axios.isAxiosError(err))
            setErrorMsg(err.response?.data?.error?.message ?? 'שגיאה בשרת, נסו שוב מאוחר יותר')
        else
            setErrorMsg('שגיאה לא צפויה')
   }
  }
  return <div className="grid min-h-screen bg-cream lg:grid-cols-[1fr_1.1fr]">
    <div className="flex items-center justify-center px-4 py-10">
    <div className="card w-full max-w-md p-8 md:p-10">
    <div className="mb-8 flex flex-col items-center text-center text-forest-800">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="size-16"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-5.5h4V21" /></svg>
      <h1 className="mt-1 text-4xl font-bold text-forest-900">הבית שלנו</h1>
      <p className="text-sm text-stone-500">אפליקציית ועד הבית</p>
      <h2 className="mt-8 text-xl font-bold text-forest-900">ברוכים הבאים!</h2>
      <p className="text-sm text-stone-500">התחברו כדי להמשיך</p>
    </div>
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <input type="password" className="field" {...register("password")}placeholder="סיסמה"/>
      {errors.password && <p className="error-text">{errors.password.message}</p>}
      <input className="field" {...register("email")}placeholder="מייל"/>
      {errors.email && <p className="error-text">{errors.email.message}</p>}

      {errorMsg && <p className="state-error text-sm">{errorMsg}</p>}

      <button className="btn btn-primary mt-3 h-12 w-full text-base" type="submit">התחבר</button>
    </form>
    <div className="mb-8 flex flex-col items-center text-center text-forest-800">
      <p className="text-sm text-stone-500">  עדיין לא רשום? פנה לועד הבית כדי להרשם</p>
    </div>
    </div>
    </div>
    <div className="relative hidden overflow-hidden bg-[url('/images/building.svg')] bg-cover bg-center lg:block">
      <div className="absolute inset-0 bg-linear-to-t from-forest-900/60 via-transparent to-transparent" />
      <p className="absolute right-12 bottom-12 font-script text-5xl leading-tight text-white drop-shadow">יחד שומרים<br />על הבית שלנו</p>
    </div>
  </div>
};
export default Login