import theme from "@/Theme/theme";
import { Box, Skeleton, Stack } from "@mui/material";

export const PostsSkeleton = () => {
  return ["small-me", "big", "small"].map((elem, index) => {
    return (
      <Box
        key={index}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: elem == "small-me" ? "flex-end" : "flex-start",
          marginBottom: 2,
        }}
      >
        <Stack
          sx={{
            width: "250px",
            height: elem == "big" ? "208px" : "113px",
            borderRadius: "10px",
            background: theme.palette.secondaryChatBg.main,
            padding: 1,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
            <Skeleton
              sx={{
                width: "30px",
                height: "30px",
                background: theme.palette.modalBoxShadow.main,
              }}
              variant="circular"
            />
            <Skeleton
              sx={{
                width: "60%",
                background: theme.palette.modalBoxShadow.main,
              }}
              variant="text"
            />
          </Box>
          {elem == "big" && (
            <Skeleton
              sx={{
                width: "100%",
                height: "80px",
                borderRadius: "10px",
                background: theme.palette.modalBoxShadow.main,
              }}
              variant="rectangular"
            />
          )}
          <Skeleton
            sx={{
              width: "100%",
              background: theme.palette.modalBoxShadow.main,
            }}
            variant="text"
          />
          <Skeleton
            sx={{
              width: "100%",
              background: theme.palette.modalBoxShadow.main,
            }}
            variant="text"
          />
          <Skeleton
            sx={{
              width: "80%",
              background: theme.palette.modalBoxShadow.main,
            }}
            variant="text"
          />
        </Stack>
      </Box>
    );
  });
};
export const PostSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Stack
        sx={{
          width: "250px",
          height: "113px",
          borderRadius: "10px",
          background: theme.palette.secondaryChatBg.main,
          padding: 1,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
          <Skeleton
            sx={{
              width: "30px",
              height: "30px",
              background: theme.palette.modalBoxShadow.main,
            }}
            variant="circular"
          />
          <Skeleton
            sx={{
              width: "60%",
              background: theme.palette.modalBoxShadow.main,
            }}
            variant="text"
          />
        </Box>

        <Skeleton
          sx={{
            width: "100%",
            background: theme.palette.modalBoxShadow.main,
          }}
          variant="text"
        />
        <Skeleton
          sx={{
            width: "100%",
            background: theme.palette.modalBoxShadow.main,
          }}
          variant="text"
        />
        <Skeleton
          sx={{
            width: "80%",
            background: theme.palette.modalBoxShadow.main,
          }}
          variant="text"
        />
      </Stack>
    </Box>
  );
};
export const CommentSkeleton = () => {
  return (
    <Stack gap={"5px"}>
      <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
        <Skeleton
          sx={{
            height: "40px",
            width: "40px",
            background: theme.palette.modalBoxShadow.main,
          }}
          variant="circular"
        />
        <Stack>
          <Skeleton
            sx={{
              width: "100px",
              background: theme.palette.modalBoxShadow.main,
            }}
            variant="text"
          />
          <Skeleton
            sx={{
              width: "150px",
              background: theme.palette.modalBoxShadow.main,
            }}
            variant="text"
          />
        </Stack>
      </Box>
      {[1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            gap: 1,
            width: "85%",
            marginLeft: 5,
          }}
        >
          <Skeleton
            sx={{
              height: "35px",
              width: "35px",
              background: theme.palette.modalBoxShadow.main,
            }}
            variant="circular"
          />
          <Stack>
            <Skeleton
              sx={{
                width: "100px",
                background: theme.palette.modalBoxShadow.main,
              }}
              variant="text"
            />
            <Skeleton
              sx={{
                width: "150px",
                background: theme.palette.modalBoxShadow.main,
              }}
              variant="text"
            />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};
