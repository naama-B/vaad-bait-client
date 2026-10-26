import axios from "axios";
import type { userLoginInput, userLoginOutput, userSingUpInput, User, ShowFaults, GetFlows, ToSendFault, ShowAnnouncements, ToSendAnnouncement, CreatePoll, ShowPolls, StatusFormData } from "../model/interfaces";

// כתובת השרת: בענן מגיעה מהמשתנה VITE_API_URL (מוגדר ב-Vercel), במחשב ברירת המחדל היא localhost
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const loginSer=async(user:userLoginInput)=>{
    const res=await axios.post<userLoginOutput>(`${API_URL}/api/auth/login`,user)
    return res.data
}

export const SingUpMan=async(user:userSingUpInput)=>{
    const token = sessionStorage.getItem('token')
    const res=await axios.post<User>(`${API_URL}/api/apartments`,user,{headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const Me=async()=>{
    const token = sessionStorage.getItem('token')
    const res=await axios.get(`${API_URL}/api/auth/me`,{headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const GetFaults=async()=>{
    const token = sessionStorage.getItem('token')
    const res=await axios.get<ShowFaults>(`${API_URL}/api/faults`,{headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const GetOneFault=async (id:number)=>{
    const token = sessionStorage.getItem('token')
    const res=await axios.get<GetFlows>(`${API_URL}/api/faults/${id}`,{headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const SendNewFault=async (newfault:ToSendFault)=>{
    const token = sessionStorage.getItem('token')
    const res=await axios.post(`${API_URL}/api/faults`,newfault,{headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const UpdateFault=async (fault:ToSendFault,id:number)=>{
    const token = sessionStorage.getItem('token')
    const res=await axios.patch(`${API_URL}/api/faults/${id}`,fault,{headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}


export const Messages=async()=>{
    const token = sessionStorage.getItem('token')
    const res=await axios.get<ShowAnnouncements>(`${API_URL}/api/announcements`,{headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data

    
}

export const SendAnnouncement = async (announcement: ToSendAnnouncement) => {
    const token = sessionStorage.getItem('token')
    const res = await axios.post<ToSendAnnouncement>(`${API_URL}/api/announcements`, announcement, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}



export const GetNeighbors=async()=>{
    const token = sessionStorage.getItem('token')
    const res=await axios.get(`${API_URL}/api/apartments`,{headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}



export const SetApartmentStatus = async (id: number, isActive: boolean) => {
    const token = sessionStorage.getItem('token')
    const res = await axios.patch<User>(`${API_URL}/api/apartments/${id}/status`, { isActive }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const ChangeMyPassword = async (currentPassword: string, newPassword: string) => {
    const token = sessionStorage.getItem('token')
    await axios.patch(`${API_URL}/api/auth/me/password`, { currentPassword, newPassword }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const SendNewPoll = async (poll: CreatePoll) => {
    const token = sessionStorage.getItem('token')
    const res = await axios.post(`${API_URL}/api/polls`, poll, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const GetPolls = async () => {
    const token = sessionStorage.getItem('token')
    const res = await axios.get<ShowPolls>(`${API_URL}/api/polls`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const VotePoll = async (id: number, optionId: number) => {
    const token = sessionStorage.getItem('token')
    const res = await axios.post(`${API_URL}/api/polls/${id}/vote`, { optionId }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const UpdateFaultStatus = async ( id: number,body: StatusFormData) => {
  const token = sessionStorage.getItem("token");
  const res = await axios.patch(`${API_URL}/api/faults/${id}/status`,body,{headers: {
        Authorization: `Bearer ${token}`,
      },});
  return res.data;
};

export const GetFaultsFilter = async (filters: { mine?: boolean, urgency?: string } = {}) => {
    const token = sessionStorage.getItem('token')
    const res = await axios.get<ShowFaults>(`${API_URL}/api/faults`, {
        params: filters,
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}