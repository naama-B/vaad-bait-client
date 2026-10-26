import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetNeighbors, SetApartmentStatus } from "../service/user"
import type { Neighbor } from "../model/interfaces"
import { useNavigate } from "react-router";

const Neighbors=()=>{
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const {data,isLoading,error}=useQuery({
        queryKey:['neighbors'],
        queryFn: GetNeighbors
    })
    const { mutate, isPending, error:errorRemove} = useMutation({
                mutationFn:({ id, isActive }: { id: number, isActive: boolean }) => SetApartmentStatus(id, isActive),
                onSuccess: () => {queryClient.invalidateQueries({ queryKey: ['neighbors'] })
                },

            })
    if(isLoading||isPending)
       return <p className="state-loading">טוען...</p>
    if(error||errorRemove)
       return <p className="state-error">{error?.message}{errorRemove?.message}</p>


    const addNeighbor=()=>{
        navigate("/singUp");
    }
    const removeNighbor=(id:number)=>{


            mutate({ id, isActive: false })
    }
    return<div className="flex flex-col gap-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
    <h1 className="page-title">דיירים</h1>
    <button className="btn btn-primary" onClick={addNeighbor}>הוספת שכן בבנין</button>
    </div>
    <div className="card divide-y divide-sand overflow-hidden">
    {data?.items.map((n:Neighbor)=><div key={n.id} className="flex flex-wrap items-center gap-x-6 gap-y-1 px-6 py-4 text-sm text-stone-600 transition hover:bg-cream/50">{n.role!='ועד'?<button className="btn btn-danger order-last h-9 px-4 text-xs lg:ms-auto" onClick={()=>removeNighbor(n.id)} >הסרת שכן</button>:<span className="order-last max-w-xs rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800 lg:ms-auto">אי אפשר להשבית את חבר הוועד. קודם יש להעביר את תפקיד הוועד לדירה אחרת</span>}<p className="badge bg-forest-50 text-forest-700">מספר דירה :{n.apartmentNumber}</p><p>קומה :{n.floor}</p><p className="order-first w-full font-bold text-forest-900 lg:w-56">{n.residentName}</p><p className="badge bg-stone-100 text-stone-600">{n.role}</p><p className="truncate">{n.email}</p><p>{n.phone}</p><p className="text-xs text-stone-400">נוצר ב :{new Date(n.createdAt).toLocaleDateString("he-IL")}</p></div>)}
    </div>
    </div>
}
export default Neighbors