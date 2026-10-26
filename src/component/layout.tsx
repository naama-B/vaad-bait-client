import { NavLink, Outlet } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../contextUser"

export const LayOut = () => {
    const { user ,logout} = useContext(AuthContext)
    
    return <div className="min-h-screen md:flex">
        <aside className="z-30 flex flex-col bg-forest-800 text-white md:fixed md:inset-y-0 md:right-0 md:w-64">
            <div className="flex items-center gap-3 px-5 py-4 md:flex-col md:gap-2 md:px-6 md:py-9 md:text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="size-9 md:size-12"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-5.5h4V21" /></svg>
                <div className="flex flex-col">
                    <span className="text-xl font-bold md:text-2xl">הבית שלנו</span>
                    <span className="text-xs text-white/60">אפליקציית ועד הבית</span>
                </div>
            </div>
            <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
                <NavLink className="nav-link" to={'/'} end>דף הבית</NavLink>
                <NavLink className="nav-link" to={'/faults'}>תקלות</NavLink>
                <NavLink className="nav-link" to={'/votes'}>הצבעות</NavLink>
                {user?.role === "ועד" && <>
                    <NavLink className="nav-link" to={'/vaad'}>ועד הבית</NavLink>
                    <NavLink className="nav-link" to={'/neighbors'}>שכנים</NavLink>
                </>}
            </nav>
            <p className="mt-auto hidden px-6 pb-10 text-center font-script text-3xl leading-snug text-white/55 md:block">יחד שומרים<br />על הבית שלנו</p>
        </aside>
        <div className="min-w-0 flex-1 md:mr-64">
            <div className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-sand bg-cream/85 px-4 backdrop-blur md:px-8">
                <span className="flex items-center gap-2 text-sm text-stone-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
                    הבית שלנו
                    {user && <>
                        <span className="text-stone-300">/</span>
                        <span className="font-semibold text-forest-900">{user.residentName}</span>
                        <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-semibold text-forest-700">דירה {user.apartmentNumber} · קומה {user.floor}</span>
                        <button className="ms-2 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-sand bg-white px-3 text-xs font-semibold text-forest-800 transition hover:border-forest-200 hover:bg-forest-50" onClick={logout}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg>התנתקות</button>
                    </>}
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-forest-800"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
            </div>
            <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
                <Outlet />
            </main>
        </div>
    </div>
}