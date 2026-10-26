import { useQuery } from "@tanstack/react-query"
import type { Announcement } from "../model/interfaces"
import { Messages } from "../service/user"
import { useContext, useState } from "react"
import { AuthContext } from "../contextUser"
import SetNewPassword from "../forms/newPassword"


const Home=()=>{
   const {user}=useContext(AuthContext)
   const [showForm, setShowForm] = useState(false)




const {data,isLoading,error}=useQuery({
    queryKey: ['messages'],
    queryFn: Messages
})

if(isLoading)
    return<p className="state-loading">טוען...</p>
if(error)
    return<p className="state-error">{error?.message}</p>


    return<div className="flex flex-col gap-6">
        <div className="card relative min-h-52 overflow-hidden bg-[url('/images/plants.svg')] bg-[length:440px_auto] bg-[position:left_-40px_center] bg-no-repeat">
        <div className="absolute inset-0 bg-linear-to-l from-white from-58% to-white/0" />
        <div className="relative flex flex-col items-start gap-2 p-8 md:max-w-[60%]">
        <h1 className="page-title text-3xl md:text-4xl">שלום {user?.residentName} </h1>

        <p className="text-stone-500">כאן תמצאו את כל המידע החשוב בבניין</p>
        
        </div>
        </div>
        <button className="btn btn-soft mt-3" onClick={() => setShowForm(true)}>איפוס סיסמה</button>
                {showForm&&<SetNewPassword onClose={() => setShowForm(false)} />}
        
        <div className="card overflow-hidden">
        <h2 className="border-b border-sand px-6 py-4 text-lg font-bold text-forest-900">הודעות אחרונות</h2>
        <div className="divide-y divide-sand">
          {data?.items.map((i: Announcement) =>
        <div key={i.id} data-type={i.type} className="group relative flex flex-col gap-1 py-5 ps-22 pe-6 transition hover:bg-cream/50 md:pe-36">
            <span className="icon-tile absolute start-6 top-5 group-data-[type=כללי]:border-sky-100 group-data-[type=כללי]:bg-sky-50 group-data-[type=כללי]:text-sky-700 group-data-[type=תחזוקה]:border-amber-100 group-data-[type=תחזוקה]:bg-amber-50 group-data-[type=תחזוקה]:text-amber-700 group-data-[type=אסיפה]:border-forest-200 group-data-[type=אסיפה]:bg-forest-100 group-data-[type=אסיפה]:text-forest-800 group-data-[type=חשוב]:border-rose-100 group-data-[type=חשוב]:bg-rose-50 group-data-[type=חשוב]:text-rose-700"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg></span>
            <h3 className="font-bold text-forest-900">{i.title}</h3>
            <p className="leading-relaxed whitespace-pre-line text-stone-600">{i.content}</p>
            <p data-type={i.type} className="badge bg-stone-100 text-stone-700 before:size-1.5 before:rounded-full before:bg-current md:absolute md:end-6 md:top-5 data-[type=כללי]:bg-sky-50 data-[type=כללי]:text-sky-700 data-[type=תחזוקה]:bg-amber-50 data-[type=תחזוקה]:text-amber-800 data-[type=אסיפה]:bg-forest-100 data-[type=אסיפה]:text-forest-800 data-[type=חשוב]:bg-rose-50 data-[type=חשוב]:text-rose-700">{i.type}</p>
            <p className="text-sm text-stone-500">{i.author.residentName} | דירה {i.author.apartmentNumber}</p>
            <p className="text-xs text-stone-400">{new Date(i.createdAt).toLocaleDateString("he-IL")}</p>
        </div>
    )}
        </div>
        </div>
    </div>

}
export default Home
