import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contextUser";


const GruadesUser = () => {
      const { user } = useContext(AuthContext)
    if(user!=null)
    {
        return <Outlet/>
    }
    return <Navigate to="/login"/>;
}

 export const GruadesUserRool = () => {
    const { user } = useContext(AuthContext)
    if (user?.role == "ועד") {
        return <Outlet />
    }
    return <Navigate to="/" />
}

export default GruadesUser