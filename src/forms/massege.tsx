import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import axios from "axios";
import { SendAnnouncement } from "../service/user";

const schema = yup.object({
    title: yup.string().required("שדה חובה").min(3, "לפחות 3 תווים").max(120, "עד 120 תווים"),
    content: yup.string().required("שדה חובה").max(5000, "עד 5000 תווים"),
    type: yup.string()
        .oneOf(["כללי", "תחזוקה", "אסיפה", "חשוב"], "סוג הודעה לא תקין")
        .required("שדה חובה"),
    isPinned: yup.boolean().required(),
}).required()

type AnnouncementFormData = yup.InferType<typeof schema>

const AnnouncementForm = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { register, handleSubmit, formState: { errors } } = useForm<AnnouncementFormData>({
        mode: "all",
        resolver: yupResolver(schema),
        defaultValues: { title: "", content: "", type: "כללי", isPinned: false },
    })

    const { mutate, isPending, error } = useMutation({
        mutationFn: SendAnnouncement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] })
            navigate('/')
        },
    })

    const onsubmit = (data: AnnouncementFormData) => {
        mutate(data)
    }

    const serverMessage = axios.isAxiosError(error)
        ? error.response?.data?.error?.message ?? error.message
        : error?.message

    return <form className="form-card" onSubmit={handleSubmit(onsubmit)}>
        <h1 className="form-title">פרסום הודעה</h1>

        <label className="field-label" htmlFor="title">כותרת</label>
        <input className="field" id="title" {...register("title")} placeholder="למשל: אסיפת דיירים" />
        {errors.title && <p className="error-text">{errors.title.message}</p>}

        <label className="field-label" htmlFor="content">תוכן ההודעה</label>
        <textarea className="field h-auto py-3"id="content" {...register("content")} rows={5} />
        {errors.content && <p className="error-text">{errors.content.message}</p>}

        <label className="field-label" htmlFor="type">סוג הודעה</label>
        <select className="field" id="type" {...register("type")}>
            <option value="כללי">כללי</option>
            <option value="תחזוקה">תחזוקה</option>
            <option value="אסיפה">אסיפת דיירים</option>
            <option value="חשוב">חשוב</option>
        </select>
        {errors.type && <p className="error-text">{errors.type.message}</p>}

        <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-600">
            <input className="size-4 accent-forest-700" type="checkbox" {...register("isPinned")} />
            נעיצה בראש לוח המודעות
        </label>

        {error && <p className="state-error text-sm">{serverMessage}</p>}

        <button className="btn btn-primary mt-2 self-start" type="submit" disabled={isPending}>
            {isPending ? "מפרסם..." : "פרסום"}
        </button>
    </form>
}
export default AnnouncementForm