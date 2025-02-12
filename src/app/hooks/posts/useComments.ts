import { queryClient } from "@/app/apiflow_Pages/layout/dashboardLayout";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { RootStateType } from "@/app/Redux/store";
import { AdminServices } from "@/app/Services/services";
import { usePostStore } from "@/app/store/usePostStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

export default function useComments() {
  const { openCommentAnchorEl, postId } = usePostStore();
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
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const data = await AdminServices(
        "get",
        "Api/Post/getpost_commentslist_by_postid?post_id=" +
          postId +
          "&start=0&end=10"
      );

      return data;
    },
    enabled: !!postId && !!openCommentAnchorEl,
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
            post_id: postId,
          }
        );
        return data;
      },
      onSuccess: () => {
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
            post_id: postId,
            mentioned_user_id: userProfile?.user?.user_id,
          }
        );
        return data;
      },
      onSuccess: (data: any, formData: any) => {
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
  };
}
