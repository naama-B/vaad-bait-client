import { Link, useNavigate } from "react-router"
import { GetFaultsFilter } from "../service/user"
import { useQuery } from "@tanstack/react-query"
import type { OneFaults } from "../model/interfaces"
import { useState } from "react"

type FaultFilter = "all" | "mine" | "urgent"

const Fault = () => {
    const navigate = useNavigate()
    const [filter, setFilter] = useState<FaultFilter>("all")

    const { data, isLoading, error } = useQuery({
        queryKey: ['faults', filter],
        queryFn: () => GetFaultsFilter(
            filter === "mine" ? { mine: true }
            : filter === "urgent" ? { urgency: "דחוף" }
            : {}
        ),
        placeholderData: (prev) => prev,
    })

    const clicktoOne = (id: number) => {
        navigate(`/onefaults/${id}`)
    }

    if (isLoading)
        return <p className="state-loading">טוען...</p>
    if (error)
        return <p className="state-error">{error.message}</p>

    return <>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="page-title">תקלות</h1>
            <Link className="btn btn-primary" to={'/faultform'}>הוספת תקלה חדשה</Link>
        </div>
        <div className="mb-4 flex gap-2">
            <button className={`btn h-9 ${filter === "all" ? "btn-primary" : "btn-soft"}`} onClick={() => setFilter("all")}>הכל</button>
            <button className={`btn h-9 ${filter === "mine" ? "btn-primary" : "btn-soft"}`} onClick={() => setFilter("mine")}>רק שלי</button>
            <button className={`btn h-9 ${filter === "urgent" ? "btn-primary" : "btn-soft"}`} onClick={() => setFilter("urgent")}>דחופות</button>
        </div>
        <div className="card divide-y divide-sand overflow-hidden">
            {data?.items.map((f: OneFaults) =>
                <div key={f.id} className={`relative flex cursor-pointer flex-col gap-1 py-5 ps-22 pe-12 transition hover:bg-cream/60 ${f.urgency === "דחוף" ? "[&_.u-icon]:border-rose-100 [&_.u-icon]:bg-rose-50 [&_.u-icon]:text-rose-600" : f.urgency === "נמוך" ? "[&_.u-icon]:border-forest-100 [&_.u-icon]:bg-forest-50 [&_.u-icon]:text-forest-600" : "[&_.u-icon]:border-amber-100 [&_.u-icon]:bg-amber-50 [&_.u-icon]:text-amber-600"}`} onClick={() => clicktoOne(f.id)}>
                    <span className="u-icon icon-tile absolute start-6 top-5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-2.4z" /></svg></span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute end-5 top-1/2 size-5 -translate-y-1/2 text-stone-300"><path d="m15 18-6-6 6-6" /></svg>
                    <h3 className="font-bold text-forest-900">{f.title}</h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-stone-600">{f.description}</p>
                    <span className="text-xs text-stone-400">{f.location} · {f.locationDetails} · {f.category}</span>
                </div>
            )}
        </div>
    </>
}
export default Fault
