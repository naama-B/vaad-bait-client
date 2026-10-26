import { useQuery } from "@tanstack/react-query"
import { GetOneFault } from "../service/user"

export const useFaults = (id: number) => {
    return useQuery({
        queryKey: ['oneFault', id],
        queryFn: () => GetOneFault(Number(id)),
        enabled: !!id && !isNaN(id),
    })
}
