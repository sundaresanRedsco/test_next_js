import { AdminServices } from "@/app/Services/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function useWorkflowPost() {
  const [openPostAnchorEl, setopenPostAnchorEl] = useState<any>(null);
  const openPosts = Boolean(openPostAnchorEl);

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
  const { data: posts, isLoading: postLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: async () => {
      const { data } = await AdminServices(
        "get",
        "Api/Post/getblog_post_like_comments?workspace_id=" + workSpaceId
      );
      return data;
    },
    enabled: !!workSpaceId && !!openPosts,
  });
  const { mutate: createPost, isPending: postCreationLoading } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (formData: any) => {
      const { data } = await AdminServices("post", "Api/Post/create_post", {
        ...formData,
        workspace_id: workSpaceId,
      });
      return data;
    },
  });

  return {
    openPosts,
    setopenPostAnchorEl,
    openPostAnchorEl,
    posts,
    postLoading,
    createPost,
    postCreationLoading,
  };
}
