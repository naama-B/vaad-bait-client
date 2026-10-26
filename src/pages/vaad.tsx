import AnnouncementForm from "../forms/massege"
import PollForm from "../forms/poll"

const VaadFunc=()=>{
    return<div className="grid items-start gap-6 xl:grid-cols-2">
        {<AnnouncementForm/>}
        {<PollForm/>}
        </div>

}
export default VaadFunc