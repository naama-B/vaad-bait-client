import {  useContext } from "react"
import { AuthContext } from "../contextUser"
import {  useQuery } from "@tanstack/react-query";
import { GetPolls } from "../service/user";
import type { Poll } from "../model/interfaces";
import VoteForm from "../forms/voteForm";

const Votes=()=>{
    useContext(AuthContext)
    const{data,isLoading,error}=useQuery({
        queryKey:['polls'],
        queryFn:GetPolls
    })
    if(isLoading)
        return <p className="state-loading">טוען...</p>
    if(error)
        return <p className="state-error">{error.message}</p>

    return<div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="page-title">הצבעות</h1>
        </div>
        <div className="grid items-start gap-5 md:grid-cols-2">
        {data?.items.map((p: Poll) =>
    <div key={p.id} className="card flex flex-col gap-2 p-6">
        <h3 className="text-lg font-bold text-forest-900">{p.question}</h3>
        {p.description && <p className="text-stone-600">{p.description}</p>}
        <p className="text-sm text-stone-500">נסגרת ב־{new Date(p.closesAt).toLocaleString("he-IL")}</p>

        {p.isOpen && !p.hasVoted && <p className="badge order-first bg-forest-800 text-white">🗳️ פתוחה, עוד לא הצבעת</p>}
        {p.isOpen && p.hasVoted && <p className="badge order-first bg-forest-50 text-forest-700">✓ הצבעת</p>}
        {!p.isOpen && <p className="badge order-first bg-stone-100 text-stone-600">🔒 ההצבעה נסגרה | הצביעו: {p.totalVotes}</p>}

       {p.isOpen && !p.hasVoted && <VoteForm poll={p} />}
       {p.results &&
    <div className="mt-2 flex flex-col gap-3 border-t border-sand pt-4">
        {p.results.options.map((r) =>
            <div key={r.optionId} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                    <span className={r.optionId === p.myOptionId ? "font-bold" : ""}>
                        {r.text}{r.optionId === p.myOptionId && " ✓"}
                    </span>
                    <span>{r.votes} · {r.percent}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-stone-100">
                    <div className="h-full rounded-full bg-forest-600" style={{ width: `${r.percent}%` }}></div>
                </div>
            </div>
        )}
    </div>
}
    </div>
)}
        </div>
        </div>
}
export default Votes
