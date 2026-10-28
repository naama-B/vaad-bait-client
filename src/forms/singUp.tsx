import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SingUpMan } from "../service/user";
import axios from "axios";
import { useNavigate } from "react-router";


const schema=yup.object({
    apartmentNumber:yup.number().typeError("חייב להיות מספר").integer("חייב להיות מספר").required("שדה חובה"),
    floor:yup.number().typeError("חייב להיות מספר").integer("חייב להיות מספר").required("שדה חובה"),
    residentName:yup.string().required("שדה חובה").min(2,"חייב להיות באורך של 2 תווים לפחות"),
    email: yup.string().required("שדה חובה").email("מייל לא תקין"),
    phone:yup.string().required("שדה חובה").matches(/^\+?[0-9-]{7,20}$/,"מספר טלפון לא תקין"),
    initialPassword:yup.string().required("שדה חובה").min(8,"לפחות 8 תווים").matches(/[A-Za-zא-ת]/,"חייבת להכיל לפחות אות אחת").matches(/[0-9]/,"חייבת להכיל לפחות ספרה אחת")
}).required()


const SingUp=()=>{
  const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { residentName:"", email: "" , phone:"",initialPassword: ""},
        mode: "all",
        resolver: yupResolver(schema),
      });
    
      const [errorMsg, setErrorMsg] = useState('')
      const [loading, setLoading] = useState(false)

      const  onSubmit=async(data:yup.InferType<typeof schema>)=>{
        console.log(data);
        setLoading(true)
        try{        
            await SingUpMan(data) 
            navigate("/neighbors");
        }catch(err){
          if (axios.isAxiosError(err) && err.response)
          {if(err.response.status==400)
            setErrorMsg("הנתונים שנשלחו אינם תקינים")
          if(err.response.status==409)
            setErrorMsg("מספר הדירה כבר קיים במערכת")}
        }
        finally{
            setLoading(false)
        }
  
      }

      return <div className="mx-auto max-w-xl">
      <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title text-2xl">הוספת דייר חדש</h2>

        <input className="field" type="number" {...register("apartmentNumber")} placeholder="הכנס מספר דירה" />
        {errors.apartmentNumber&&<p className="error-text">{errors.apartmentNumber.message}</p>}
        <input className="field" type="number"{...register("floor")} placeholder="הכנס מספר קומה" />
        {errors.floor&&<p className="error-text">{errors.floor.message}</p>}
        <input className="field" {...register("residentName")} placeholder="הכנס משפחת בעלי הדירה" />
        {errors.residentName&&<p className="error-text">{errors.residentName.message}</p>}
        <input className="field" {...register("email")} placeholder="הכנס מייל בעלי הדירה" />
        {errors.email&&<p className="error-text">{errors.email.message}</p>}
        <input className="field" {...register("phone")} placeholder="הכנס טלפון בעלי הדירה" />
        {errors.phone&&<p className="error-text">{errors.phone.message}</p>}
        <input className="field" {...register("initialPassword")} placeholder="הכנס סיסמא ראשונית" />
        {errors.initialPassword&&<p className="error-text">{errors.initialPassword.message}</p>}

        {loading && <p className="state-loading py-2">טוען...</p>}
        {errorMsg && <p className="state-error text-sm">{errorMsg}</p>}

        <button className="btn btn-primary mt-3 h-12 w-full text-base" type="submit" disabled={loading}>הרשם</button>
      </form>
      </div>

}
export default SingUp