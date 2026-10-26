import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import type { FaultStatus, GetFlows, StatusFormData } from "../model/interfaces"
import { UpdateFaultStatus } from "../service/user"
import * as yup from "yup"
import axios from "axios"

const Schema = yup.object({
    status: yup.string().required("יש לבחור סטטוס"),
    note: yup.string(),
    rejectionReason: yup.string().when("status", { is: "נדחה", then: (s) => s.required("חובה לכתוב סיבת דחייה").min(5, "לפחות 5 תווים") }),
})

const statusLabels: Record<string, string> = {
    חדש: "חדשה",
    בטיפול: "בטיפול",
    טופל: "טופלה",
    נדחה: "נדחתה",
}
const StatusForm = ({ fault }: { fault: GetFlows }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<StatusFormData>({
        resolver: yupResolver(Schema),
        defaultValues: { status: "" }
    })

    const queryClient = useQueryClient()

    const { mutate, isPending, error } = useMutation({
        mutationFn: ({ id, body }: { id: number, body: StatusFormData }) => UpdateFaultStatus(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['oneFault', fault.id] })
            queryClient.invalidateQueries({ queryKey: ['faults'] })
            reset()
        }
    })

    if (isPending)
        return <p className="state-loading">טוען...</p>

    const onSubmit = (data: StatusFormData) => {
        mutate({
            id: fault.id,
            body: {
                status: data.status as FaultStatus,
                note: data.note || undefined,
                rejectionReason: data.status === "נדחה" ? data.rejectionReason : undefined,
            }
        })
    }

    return <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">עדכון סטטוס</h2>
        <select className="field" {...register("status")}>
            <option value="" disabled>בחר סטטוס חדש</option>
            {fault.allowedNextStatuses.map(s => <option key={s} value={s}>{statusLabels[s] ?? s}</option>)}
        </select>
        {errors.status && <p className="error-text">{errors.status.message}</p>}

        <input className="field" {...register("rejectionReason")} placeholder="סיבת דחייה (רק אם נדחתה)" />
        {errors.rejectionReason && <p className="error-text">{errors.rejectionReason.message}</p>}

        <input className="field" {...register("note")} placeholder="הערה (לא חובה)" />

        {axios.isAxiosError(error) && <p className="state-error text-sm">{error.response?.data.error.message}</p>}

        <button className="btn btn-primary mt-2 w-full" type="submit">עדכן סטטוס</button>
    </form>
}
export default StatusForm