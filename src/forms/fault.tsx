import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SendNewFault, UpdateFault } from "../service/user";
import type { ToSendFault } from "../model/interfaces";
import { useNavigate, useParams } from "react-router";
import { useFaults } from "../component/getfaultbyid";
const schema = yup.object({
    title: yup.string().required("שדה חובה"),
    description: yup.string().required("שדה חובה"),
    category: yup.string().required("שדה חובה"),
    location: yup.string().required("שדה חובה"),
    locationDetails: yup.string(),
    urgency: yup.string().required("שדה חובה"),
}).required()

const FaultForm = () => {
    const { id } = useParams()
    const isEdit = !!id

    const { data: datafault, isLoading: isLoadingfault, error: errorfault } = useFaults(Number(id))

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "all",
        resolver: yupResolver(schema),
        defaultValues: { urgency: "", category: "", location: "" },
        values: isEdit && datafault ? {
            title: datafault.title,
            description: datafault.description,
            category: datafault.category,
            location: datafault.location,
            locationDetails: datafault.locationDetails ?? "",
            urgency: datafault.urgency,
        } : undefined,
    });

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate, isPending, error } = useMutation({
        mutationFn: (data: ToSendFault) => !isEdit ? SendNewFault(data) : UpdateFault(data, Number(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['faults'] })
            navigate('/faults')
        },
    })
    if (isEdit && isLoadingfault)
        return <p className="state-loading">טוען...</p>
    if (isEdit && errorfault)
        return <p className="state-error">{errorfault.message}</p>

    const onsubmit = async (data: ToSendFault) => {
        mutate(data)
    }
    return <div className="card grid overflow-hidden lg:grid-cols-[minmax(0,1fr)_20rem]">
    <form className="flex flex-col gap-3 p-6 md:p-10" onSubmit={handleSubmit(onsubmit)}>
        <h2 className="form-title text-2xl">דיווח תקלה</h2>
        <input className="field" {...register("title")} placeholder="כותרת" />
        {errors.title && <p className="error-text">{errors.title.message}</p>}

        <input className="field" {...register("description")} placeholder="תאור התקלה" />
        {errors.description && <p className="error-text">{errors.description.message}</p>}

        <select className="field" {...register("urgency")}>
            <option value="" disabled>בחר דחיפות</option>
            <option value="נמוך">נמוכה</option>
            <option value="רגיל">בינונית</option>
            <option value="דחוף">גבוהה</option>
        </select>
        {errors.urgency && <p className="error-text">{errors.urgency.message}</p>}

        <select className="field" {...register("category")}>
            <option value="" disabled>בחר קטגוריה</option>
            <option value="מעלית">מעלית</option>
            <option value="אינסטלציה">אינסטלציה ונזילות</option>
            <option value="חשמל">חשמל ותאורה</option>
            <option value="אינטרקום">אינטרקום ושערים</option>
            <option value="ניקיון">ניקיון</option>
            <option value="גינון">חצר וגינון</option>
            <option value="אחר">אחר</option>
        </select>
        {errors.category && <p className="error-text">{errors.category.message}</p>}

        <select className="field" {...register("location")}>
            <option value="" disabled>בחר מיקום</option>
            <option value="משותף">שטח משותף </option>
            <option value="בדירה">בתוך הדירה</option>
        </select>
        {errors.location && <p className="error-text">{errors.location.message}</p>}

        <input className="field" {...register("locationDetails")} placeholder="מיקום התקלה" />
        {errors.locationDetails && <p className="error-text">{errors.locationDetails.message}</p>}
        {isPending && <p className="state-loading py-2">טוען...</p>}
        {error && <p className="state-error text-sm">{error.message}</p>}


        <button className="btn btn-primary mt-3 h-12 w-full text-base" type="submit" disabled={isPending}>שלח</button>
    </form>
    <div className="relative hidden bg-[url('/images/plants.svg')] bg-cover bg-center lg:block">
        <div className="absolute inset-0 bg-linear-to-t from-forest-900/55 via-transparent to-transparent" />
        <p className="absolute inset-x-8 bottom-10 font-script text-3xl leading-tight text-white drop-shadow">דיווח קל ומהיר<br />שומר על הבית שלנו</p>
    </div>
    </div>
}
export default FaultForm