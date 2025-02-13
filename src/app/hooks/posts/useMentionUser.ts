import { AdminServices } from "@/app/Services/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  email: string;
  channel_id: string;
};

export default function useMentionUser({ email, channel_id }: Props) {
  const { data: participants, isLoading: participantsLoading } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => {
      const data = await AdminServices(
        "get",
        `Api/Post/get_all_participant_by_Channel_id_with_offset_and_email_search?channel_id=${channel_id}&offset=0&limit=1&email=${email}`
      );

      return data;
    },
    enabled: !!email && !!channel_id,
  });
  return { participantsLoading, participants };
}
