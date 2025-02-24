import { queryClient } from "@/app/apiflow_Pages/layout/dashboardLayout";
import { CommonReducer } from "@/redux/commonReducer";
import { RootStateType } from "@/redux/store";
import { AdminServices } from "@/app/Services/services";
import { usePostStore } from "@/app/store/usePostStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

export default function useComments() {
  const { openComment, resetData, setComment } = usePostStore();
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const pathname = usePathname();
  const [workSpaceId, setworkSpaceId] = useState("");
  useEffect(() => {
    const pathParts = pathname.split("/");

    const workspaceIndex = pathParts.indexOf("workspaceId");

    if (workspaceIndex !== -1 && workspaceIndex + 1 < pathParts.length) {
      setworkSpaceId(pathParts[workspaceIndex + 1]);
    }
  }, [pathname]);

  //*API CALLS
  const {
    data: comments,
    isLoading: commentsLoading,
    refetch: getComments,
    error: commentsErr,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        const data = await AdminServices(
          "get",
          "Api/Post/getpost_commentslist_by_postid?post_id=" +
            openComment +
            "&start=0&end=10"
        );
        return data;
      } catch (error) {
        return [];
      }
    },
    enabled: !!openComment,
    staleTime: 0,
    retry: false,
  });

  const { mutate: createComment, isPending: commentCreationLoading } =
    useMutation({
      mutationKey: ["createComment"],
      mutationFn: async (formData: any) => {
        const data = await AdminServices(
          "post",
          "Api/Post/blog_comment_create",
          {
            ...formData,
            post_id: openComment,
          }
        );
        return data;
      },
      onSuccess: () => {
        resetData("mention");
        setComment("");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    });
  const { mutate: deleteComment, isPending: commentDeleting } = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: async (id: any) => {
      const data = await AdminServices(
        "delete",
        "Api/Post/delete_comment_by_comment_id?comment_id=" + id
      );
      return data;
    },
    onSuccess: () => {
      resetData("selectedData");
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const { mutate: deleteCommentReply, isPending: commentReplyDeleting } =
    useMutation({
      mutationKey: ["deleteCommentReply"],
      mutationFn: async (id: any) => {
        const data = await AdminServices(
          "delete",
          "Api/Post/delete_comment_reply_by_commentreply_id?comment_Reply_id=" +
            id
        );
        return data;
      },
      onSuccess: () => {
        resetData("selectedData");
        setComment("");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    });

  const { mutate: createReplies, isPending: createRepliesLoading } =
    useMutation({
      mutationKey: ["createReplies"],
      mutationFn: async (formData: any) => {
        const data = await AdminServices(
          "post",
          "api/Post/blog_comment_replycreate",
          {
            ...formData,
            post_id: openComment,
            mentioned_user_id: userProfile?.user?.user_id,
          }
        );
        return data;
      },
      onSuccess: (data: any, formData: any) => {
        resetData("mention");
        setComment("");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      },
    });

  return {
    commentsLoading,
    comments,
    createComment,
    commentCreationLoading,
    createReplies,
    createRepliesLoading,
    getComments,
    commentReplyDeleting,
    deleteCommentReply,
    commentDeleting,
    deleteComment,
    commentsErr,
  };
}
