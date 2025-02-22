import { queryClient } from "@/app/apiflow_Pages/layout/dashboardLayout";
import { AdminServices } from "@/app/Services/services";
import { usePostStore } from "@/app/store/usePostStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function useWorkflowPost(flow_id?: any) {
  const pathname = usePathname();

  const { triggerGetPost, channelId, setfile, resetData } = usePostStore();

  const {
    data: posts,
    isLoading: postLoading,
    refetch: getPosts,
  } = useQuery({
    queryKey: ["posts"], // Include channelId in the queryKey
    queryFn: async () => {
      if (!channelId) return null; // Avoid fetching if channelId is missing
      const data = await AdminServices(
        "get",
        `Api/Post/getpost_by_channelid_offset?channel_id=${channelId}`
      );
      return data;
    },
    enabled: !!channelId,
  });
  const { mutate: createPost, isPending: postCreationLoading } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (formData: any) => {
      const data = await AdminServices("post", "Api/Post/create_post", {
        ...formData,
        workspace_id: null,
      });
      return data;
    },
    onSuccess: () => {
      setfile(null);
      resetData("inputData");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const { mutate: updatePost, isPending: postUpdating } = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: async (formData: any) => {
      const data = await AdminServices("put", "Api/Post/update_post", {
        ...formData,
      });
      return data;
    },
    onSuccess: () => {
      setfile(null);
      resetData("selectedData");
      resetData("inputData");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const { mutate: deletePost, isPending: postDeleting } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (id: any) => {
      const data = await AdminServices(
        "delete",
        "Api/Post/delete_post?post_id=" + id
      );
      return data;
    },
    onSuccess: () => {
      setfile(null);
      resetData("selectedData");
      resetData("inputData");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  useEffect(() => {
    if (triggerGetPost && channelId) {
      getPosts();
    }
  }, [triggerGetPost]);

  return {
    getPosts,
    posts,
    postLoading,
    createPost,
    postCreationLoading,
    postDeleting,
    deletePost,
    postUpdating,
    updatePost,
  };
}
