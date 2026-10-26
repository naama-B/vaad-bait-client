export interface User{
  id: number;                        
  apartmentNumber: number;             
  floor: number;                       
  residentName: string;               
  email: string;                       
  phone: string | null;               
  role: "דייר" | "ועד";      
  isActive: boolean;                   
  deactivatedAt: string | null;        
  createdAt: string;                   
  updatedAt: string;               
}

export interface userLoginInput {
  email: string,
  password: string,
}

export interface userLoginOutput {
  token: string,
  user: User
} 

export interface userSingUpInput{
  apartmentNumber: number;             
  floor: number;                       
  residentName: string;               
  email: string;                       
  phone: string | null;
  initialPassword:string
}

export interface OneFaults{
  id:number,
  title:string,
  description:string,
  category:string,
  location:string,
  locationDetails:string,
  urgency :string,
  status:string,
  rejectionReason:string|null,
}

export interface ToSendFault{
  title:string,
  description:string,
  category:string,
  location:string,
  locationDetails?:string,
  urgency :string,
}

export interface ShowFaults{
  items:OneFaults[],
}

export interface Flow{
  "id": number,
  "fromStatus": string|null,
  "toStatus": string|null,
  "note": string|null,
  "by": string,
  "createdAt": string
}

export interface Reporter {
  id: number,
  apartmentNumber: number,
  residentName: string,
}
 
export interface GetFlows extends OneFaults{
  canEdit: boolean,
  canChangeStatus: boolean,
  allowedNextStatuses: string[],
  updates: Flow[]
  reporter: Reporter,
}

export interface Author {
  residentName: string,
  apartmentNumber: number,
}

export interface Announcement {
  id: number,
  title: string,
  content: string,
  type: string,
  isPinned: boolean,
  author: Author,
  createdAt: string,
  updatedAt: string,
}
export interface ShowAnnouncements {
  items: Announcement[],
}
export interface ToSendAnnouncement {
  title: string,
  content: string,
  type: string,
  isPinned: boolean,
}

export interface Neighbor {
  id: number;
  apartmentNumber: number;
  floor: number;
  residentName: string;
  email: string;
  phone: string;
  role: string;            
  isActive: boolean;
  deactivatedAt: string | null;  
  createdAt: string;       
  updatedAt: string;  
}

export interface PasswordFormData {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export interface CreatePoll {
    question: string
    description?: string
    closesAt: string
    options: string[]
}

export interface PollFormData {
    question: string
    description?: string
    closesAt: string
    option1: string
    option2: string
    option3?: string
    option4?: string
    option5?: string
}
export interface PollOption {
    id: number
    text: string
    order: number
}

export interface PollOptionResult {
    optionId: number
    text: string
    votes: number
    percent: number
}

export interface PollResults {
    totalVotes: number
    eligibleApartments: number
    options: PollOptionResult[]
}

export interface Poll {
    id: number
    question: string
    description: string | null
    closesAt: string
    isOpen: boolean
    options: PollOption[]
    hasVoted: boolean
    totalVotes: number | null
    createdAt: string
    updatedAt: string
    myOptionId: number | null
    results: PollResults | null
}

export interface ShowPolls {
    items: Poll[]
}

export type FaultStatus = "חדש" | "בטיפול" | "טופל" | "נדחה";

export interface Fault {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  locationDetails: string | null;
  urgency: string;
  status: FaultStatus;
  rejectionReason: string | null;
  hasImage: boolean;
  imageUrl: string | null;
  isMine: boolean;
}

export interface StatusFormData {
    status: string
    note?: string
    rejectionReason?: string
}

