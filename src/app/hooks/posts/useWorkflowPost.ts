import { queryClient } from "@/app/apiflow_Pages/layout/dashboardLayout";
import { AdminServices } from "@/app/Services/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

// export default function useWorkflowPost() {
//   const [openPostAnchorEl, setopenPostAnchorEl] = useState<any>(null);
//   const openPosts = Boolean(openPostAnchorEl);

//   const pathname = usePathname();
//   const [workSpaceId, setworkSpaceId] = useState("");
//   useEffect(() => {
//     const pathParts = pathname.split("/");

//     const workspaceIndex = pathParts.indexOf("workspaceId");

//     if (workspaceIndex !== -1 && workspaceIndex + 1 < pathParts.length) {
//       setworkSpaceId(pathParts[workspaceIndex + 1]);
//     }
//   }, [pathname]);
//   //*API CALLS
//   const { data: posts, isLoading: postLoading } = useQuery({
//     queryKey: ["getPosts"],
//     queryFn: async () => {
//       const data = await AdminServices(
//         "get",
//         "Api/Post/getpost_like_commentsbychannel?channel_id=cc2aeda14c5247db8200b7bacd5d9498"
//       );
//       return data;
//     },
//     enabled: !!workSpaceId && !!openPosts,
//   });
//   const { mutate: createPost, isPending: postCreationLoading } = useMutation({
//     mutationKey: ["createPost"],
//     mutationFn: async (formData: any) => {
//       const data = await AdminServices("post", "Api/Post/create_post", {
//         ...formData,
//         workspace_id: workSpaceId,
//       });
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["getPosts"] });
//     },
//   });

//   return {
//     openPosts,
//     setopenPostAnchorEl,
//     openPostAnchorEl,
//     posts,
//     postLoading,
//     createPost,
//     postCreationLoading,
//   };
// }

export default function useWorkflowPost() {
  const [openPostAnchorEl, setopenPostAnchorEl] = useState<any>(null);
  const [channelId, setChannelId] = useState<any>("");

  const openPosts = Boolean(openPostAnchorEl);

  const pathname = usePathname();

  const {
    data: posts,
    mutate: getPosts,
    isPending: postLoading,
  } = useMutation({
    mutationKey: ["getPosts"], // Include channelId in the queryKey
    mutationFn: async (channelId: any) => {
      if (!channelId) return null; // Avoid fetching if channelId is missing
      const data = await AdminServices(
        "get",
        `Api/Post/getpost_by_channelid_offset?channel_id=${channelId}`
      );
      return data;
    },
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
    onSuccess: (data: any) => {
      // After successful creation, invalidate the previous query to fetch updated posts
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });

      // Get the channelId from the variables
      const channelId = data.channel_id; // Assuming formData contains channel_id
      getPosts(channelId); // Refetch posts after creating a new post
    },
  });

  const { mutate: createLike, isPending: likeLoading } = useMutation({
    mutationKey: ["createLike"],
    mutationFn: async (formData: any) => {
      const data = await AdminServices("post", "Api/Post/blog_like_create", {
        ...formData,
      });
      return data;
    },
    onSuccess: (data: any, formData: any) => {
      console.log("Like created, invalidating queries...", formData);
      // After successful creation, invalidate the previous query to fetch updated posts
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });

      // Get the channelId from the variables
      const channelId = formData.channel_id;
      getPosts(channelId); // Refetch posts after creating a new post
      console.log("Like created, method called...");
    },
  });

  return {
    openPosts,
    getPosts,
    setopenPostAnchorEl,
    openPostAnchorEl,
    posts,
    postLoading,
    createPost,
    postCreationLoading,
    createLike,
    likeLoading,
    setChannelId,
  };
}
