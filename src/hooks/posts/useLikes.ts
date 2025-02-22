import { queryClient } from "@/app/apiflow_Pages/layout/dashboardLayout";
import { AdminServices } from "@/app/Services/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

type Props = { postid: any };

export default function useLikes({ postid }: Props) {
  //*Likes Api calls
  const { mutate: createLike, isPending: likeCreating } = useMutation({
    mutationKey: ["createLike"],
    mutationFn: async (formData: any) => {
      const data = await AdminServices("post", "Api/Post/blog_like_create", {
        ...formData,
      });
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });
  const { data: likes, isLoading: likesLoading } = useQuery({
    queryKey: ["likes"],
    queryFn: async () => {
      const data = await AdminServices(
        "get",
        `Api/Post/getpost_likelist_by_postid?post_id=${postid}&start=0&end=5`
      );

      return data;
    },
    enabled: !!postid,
  });
  return { createLike, likeCreating, likes, likesLoading };
}
