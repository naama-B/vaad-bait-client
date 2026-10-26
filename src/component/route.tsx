import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../forms/Login";
import SingUp from "../forms/singUp";
import { LayOut } from "./layout";
import Home from "../pages/home";
import Fault from "../pages/faults";
import Votes from "../pages/votes";
import Onefaults from "../pages/onefaults";
import GruadesUser, { GruadesUserRool } from "./groudes";
import FaultForm from "../forms/fault";
import { AuthProvider } from "../contextUser";
import Neighbors from "../pages/neighbors";
import PollForm from "../forms/poll";
import VaadFunc from "../pages/vaad";

export const route=createBrowserRouter([{
    path: "/", element:  <AuthProvider><App /></AuthProvider>, children:[
        {element:<GruadesUser/>,children:[
            {element:<LayOut/>, children:[
                {path:'/',element:<Home/>},
                {path:'faults',element:<Fault/>},
                {path:'votes',element:<Votes/>},
                {path:'onefaults/:id',element:<Onefaults/>},
                {path:'faultform/:id?',element:<FaultForm/>},
                {element:<GruadesUserRool/>,children:[
                    {path:'singUp', element:<SingUp/>},
                    {path:'vaad',element:<VaadFunc/>},
                    {path:'neighbors',element:<Neighbors/>},
                    {path:'pollform',element:<PollForm/>}
                ]},
        ]}]},
        {path:'login', element:<Login/>},
    ]
    }
])