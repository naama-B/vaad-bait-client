import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Poll } from "../model/interfaces";
import { VotePoll } from "../service/user";

const VoteForm = ({ poll }: { poll: Poll }) => {
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState: { errors } } = useForm<{ optionId: string }>()

  const { mutate, isPending, error } = useMutation({
    mutationFn: (optionId: number) => VotePoll(poll.id, optionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['polls'] })
  })

  const onSubmit = (data: { optionId: string }) => {
    mutate(Number(data.optionId))
  }

  return (
    <form className="mt-2 flex flex-col gap-2 border-t border-sand pt-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="sr-only">{poll.question}</h3>
      {poll.description && <p className="sr-only">{poll.description}</p>}
      <p className="sr-only">נסגר ב: {new Date(poll.closesAt).toLocaleString("he-IL")}</p>

      {[...poll.options]
        .sort((a, b) => a.order - b.order)
        .map((option) => (
          <label key={option.id} className="flex h-12 cursor-pointer items-center gap-3 rounded-xl border border-sand px-4 text-stone-700 transition hover:border-forest-200 hover:bg-forest-50/50 has-checked:border-forest-600 has-checked:bg-forest-50 has-checked:font-semibold has-checked:text-forest-900">
            <input className="size-4 accent-forest-700" type="radio" value={option.id}
              {...register("optionId", { required: "יש לבחור אפשרות" })} />
            {option.text}
          </label>
        ))}
      {errors.optionId && <p className="error-text">{errors.optionId.message}</p>}

      {axios.isAxiosError(error) && <p className="state-error text-sm">{error.response?.data?.error?.message ?? error.message}</p>}

      <button className="btn btn-primary mt-2 w-full" type="submit" disabled={isPending}>
        {isPending ? "שולח..." : "הצבע/י"}
      </button>
    </form>
  );
};

export default VoteForm;