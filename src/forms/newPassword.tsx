import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { ChangeMyPassword } from "../service/user"
import axios from "axios"
import type { PasswordFormData } from "../model/interfaces"
const Schema = yup.object({
    currentPassword: yup.string().required("יש להזין את הסיסמה הנוכחית"),
    newPassword: yup.string().required("יש להזין סיסמה חדשה").min(8, "לפחות 8 תווים").matches(/[A-Za-z]/, "חייבת להכיל לפחות אות אחת באנגלית").matches(/[0-9]/, "חייבת להכיל לפחות ספרה אחת"),
    confirmPassword: yup.string().required("יש לאמת את הסיסמה").oneOf([yup.ref("newPassword")], "הסיסמאות לא תואמות"),
})

const SetNewPassword = ({ onClose }: { onClose: () => void })=>{
    const { register, handleSubmit, formState: { errors } } = useForm<PasswordFormData>({
        resolver: yupResolver(Schema)
    })

    const { mutate, isPending, error } = useMutation({
        mutationFn: ({ currentPassword, newPassword }: { currentPassword: string, newPassword: string }) => ChangeMyPassword(currentPassword, newPassword),
        onSuccess: () => onClose()
    })
    if(isPending)
        return <p className="state-loading">טוען...</p>

    const onSubmit = (data: PasswordFormData) => {
        mutate({ currentPassword: data.currentPassword, newPassword: data.newPassword })
    }


    return<><form className="form-card max-w-md" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="form-title">איפוס סיסמה</h2>
                <input className="field" type="password" placeholder="סיסמה נוכחית" {...register("currentPassword")} />
                {errors.currentPassword && <p className="error-text">{errors.currentPassword.message}</p>}

                <input className="field" type="password" placeholder="סיסמה חדשה" {...register("newPassword")} />
                {errors.newPassword && <p className="error-text">{errors.newPassword.message}</p>}

                <input className="field" type="password" placeholder="אימות סיסמה חדשה" {...register("confirmPassword")} />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}

                {axios.isAxiosError(error) && <p className="state-error text-sm">{error.response?.data.error.message}</p>}

                <button className="btn btn-primary mt-2 self-start">שמור</button>
            </form></>
}
export default SetNewPassword