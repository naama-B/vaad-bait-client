import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import type { CreatePoll, PollFormData } from "../model/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SendNewPoll } from "../service/user";
import { useNavigate } from "react-router";

const schema=yup.object({
    question:yup.string().required("יש לכתוב את נושא ההצבעה").min(5,"לפחות 5 תווים").max(200,"עד 200 תווים"),
    description:yup.string(),
    closesAt: yup.string().required("יש להוסיף תאריך סגירת ההצבעה").test("future", "אי אפשר לבחור תאריך שכבר עבר", (value) => !!value && new Date(value) > new Date()),
    option1:yup.string().required("חובה לפחות 2 אופציות"),
    option2:yup.string().required("חובה לפחות 2 אופציות"),
    option3:yup.string(),
    option4:yup.string(),
    option5:yup.string(),
}).required()

 
const PollForm=()=>{
    const queryClient=useQueryClient()
      const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "all",
        resolver: yupResolver(schema),});
        const { mutate, isPending, error } = useMutation({
        mutationKey:['polls'],
        mutationFn:(poll:CreatePoll)=> SendNewPoll(poll),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['polls'] })
            navigate("/votes")
        }
    })
    const AddPoll=(poll:PollFormData)=>{
        const options=[poll.option1,poll.option2,poll.option3,poll.option4,poll.option5].filter(p=>p) as string[]
        mutate({question: poll.question,description: poll.description,closesAt: poll.closesAt,options: options})
    }
    if(isPending)
        return <p className="state-loading">טוען...</p>
    if(error)
        return <p className="state-error">{error.message}</p>
    const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
    return <>
    <form className="form-card mx-auto max-w-2xl" onSubmit={handleSubmit((data)=>AddPoll(data))}>
      <h2 className="form-title text-2xl">פתיחת הצבעה חדשה</h2>
      <input className="field"  {...register("question")}placeholder="נושא ההצבעה "/>
      {errors.question && <p className="error-text">{errors.question.message}</p>}
      <input className="field"  {...register("description")}placeholder=" תיאור - אופציונלי"/>
      {errors.description && <p className="error-text">{errors.description.message}</p>}
      <input className="field" type="datetime-local" min={now} {...register("closesAt")} placeholder=" תאריך סגירת ההצבעה"/>
      {errors.closesAt && <p className="error-text">{errors.closesAt.message}</p>}
      {<p className="mt-2 text-sm font-medium text-stone-500">חובה לפחות 2 אופציות </p>}
      <input className="field"  {...register("option1")}placeholder="אופציה 1"/>
      {errors.option1 && <p className="error-text">{errors.option1.message}</p>}
      <input className="field"  {...register("option2")}placeholder="אופציה 2"/>
      {errors.option2 && <p className="error-text">{errors.option2.message}</p>}
      <input className="field"  {...register("option3")}placeholder="אופציה 3"/>
      {errors.option3 && <p className="error-text">{errors.option3.message}</p>}
      <input className="field"  {...register("option4")}placeholder="אופציה 4"/>
      {errors.option4 && <p className="error-text">{errors.option4.message}</p>}
      <input className="field"  {...register("option5")}placeholder="אופציה 5"/>
      {errors.option5 && <p className="error-text">{errors.option5.message}</p>}
      <button className="btn btn-primary mt-3 h-12 w-full text-base" >הוסף הצבעה</button>
    </form>
    </>
}
export default PollForm