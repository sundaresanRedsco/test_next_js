import { queryClient } from "@/app/apiflow_Pages/layout/dashboardLayout";
import { AdminServices } from "@/app/Services/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function useComments(postId: any) {
  const [openCommentAnchorEl, setopenCommentAnchorEl] = useState<any>(null);
  const openComments = Boolean(openCommentAnchorEl);

  const pathname = usePathname();
  const [workSpaceId, setworkSpaceId] = useState("");
  useEffect(() => {
    const pathParts = pathname.split("/");

    const workspaceIndex = pathParts.indexOf("workspaceId");

    if (workspaceIndex !== -1 && workspaceIndex + 1 < pathParts.length) {
      setworkSpaceId(pathParts[workspaceIndex + 1]);
    }
  }, [pathname]);
  console.log(postId, openComments, openCommentAnchorEl, "showErr-comment");

  //*API CALLS
  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["getComments"],
    queryFn: async () => {
      const data = await AdminServices(
        "get",
        "Api/Post/getpost_commentslist_by_postid?post_id=" +
          postId +
          "?start=0&end=10"
      );
      return data;
    },
    enabled: !!postId && !!openComments,
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
        queryClient.invalidateQueries({ queryKey: ["getComments"] });
      },
    });

  return {
    openComments,
    setopenCommentAnchorEl,
    openCommentAnchorEl,
    commentsLoading,
    comments,
    createComment,
    commentCreationLoading,
  };
}
