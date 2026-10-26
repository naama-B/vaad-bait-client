import { useNavigate, useParams } from "react-router"
import { useFaults } from "../component/getfaultbyid"
import StatusForm from "../forms/Status"

const Onefaults = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading, error } = useFaults(Number(id))
    if (isLoading)
        return <p className="state-loading">טוען...</p>
    if (error)
        return <p className="state-error">{error.message}</p>
    const sentEdit = (id: number) => {
        navigate(`/faultform/${id}`)
    }
    return <>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className={`card flex flex-col gap-2 p-6 md:p-8 ${data?.urgency === "דחוף" ? "[&_.u-badge]:bg-rose-50 [&_.u-badge]:text-rose-700" : data?.urgency === "נמוך" ? "[&_.u-badge]:bg-forest-50 [&_.u-badge]:text-forest-700" : "[&_.u-badge]:bg-amber-50 [&_.u-badge]:text-amber-800"}`}>
            {data?.canEdit && <button className="btn btn-soft order-first self-end" onClick={() => sentEdit(data?.id)}>ערוך תקלה</button>}
            <p className="badge bg-cream text-stone-600">{data?.category}</p>
            <p className="leading-relaxed text-stone-600">{data?.description}</p>
            <p className="text-sm text-stone-500">{data?.location}</p>
            <p className="text-sm text-stone-500">{data?.locationDetails}</p>
            <p className="text-sm text-stone-500">דווח על ידי: {data?.reporter?.residentName} | דירה {data?.reporter?.apartmentNumber}</p>
            <p className="order-first text-2xl font-bold text-forest-900">{data?.title}</p>
            <p className="u-badge badge">{data?.urgency}</p>
            <p className="mt-3 w-fit rounded-xl bg-forest-800 px-4 py-2 text-sm font-semibold text-white">סטטוס: {data?.status === "חדש" ? "חדשה"
                                                                                                                 : data?.status === "בטיפול" ? "בטיפול"
                                                                                                                 : data?.status === "טופל" ? "טופלה"
                                                                                                                 : data?.status === "נדחה" ? "נדחתה" : data?.status}</p>

{data?.status === "נדחה" && <p className="state-error text-sm">סיבת הדחייה: {data.rejectionReason}</p>}
        </div>
        {data?.canChangeStatus && <StatusForm fault={data} />}
        </div>

        <h1 className="page-title mt-10 mb-4">היסטורית טיפול בתקלה</h1>
        <div className="card flex flex-col gap-3 p-6">
        <div className="flex flex-col gap-3 border-s-2 border-forest-100 ps-6">
            {data?.updates.map(f => <div key={f.id} className="relative rounded-xl bg-cream px-4 py-3 text-sm text-stone-600 before:absolute before:-start-[31px] before:top-4 before:size-3 before:rounded-full before:bg-forest-600 before:ring-4 before:ring-white">{f.by} · {new Date(f.createdAt).toLocaleDateString("he-IL")} · {f.fromStatus} · {f.note} · {f.toStatus}</div>)}
        </div>
        </div>

        {!data?.canEdit && <h3 className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">לא ניתן לשנות או לערוך את הטופס לאחר תחילת הטיפול בתקלה</h3>}
    </>
}
export default Onefaults
