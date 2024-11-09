import React, { useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";

interface AvatarComponentProps {
  avatarType?: "userValue" | "image" | "customIcon";
  userLists?: Array<{ user: { name: string; color: string } }>;
  username?: string;
  imageUrl?: string;
  customIcon?: React.ReactNode; // prop for custom SVG or icon
}

export const AvatarText = styled(Typography)`
  font-family: Inter-Regular !important;
  color: ${({ theme }) => theme.palette.v2IconTextColor.main};
  font-weight: 600;
  line-height: normal;
`;

const GAvatar: React.FC<AvatarComponentProps> = ({
  avatarType,
  userLists,
  username,
  imageUrl,
  customIcon,
}) => {
  const [selectedUser, setSelectedUser] = useState<string>(username || "");
  const [selectClicked, setSelectClicked] = useState(false);

  //spliting the user Name and getting letters  with backgroundcolor
  const stringAvatar = (name: string, color: string) => {
    const firstName = name?.split(" ")[0];
    const firstLetter = firstName ? firstName[0] : "";
    const secondLetter = firstName && firstName?.length > 1 ? firstName[1] : "";
    const combinedLetters = firstLetter || secondLetter;

    return {
      sx: {
        bgColor: color,
        color: "#fff",
      },
      children: combinedLetters,
    };
  };

  //name avatar
  const renderStringAvatar = (user: { name: string; color: string }) => {
    return (
      <Tooltip title={user.name} arrow>
        <div
          style={{
            width: 23,
            height: 23,
            borderRadius: "50%",
            backgroundColor: user.color,
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 3,
            fontFamily: "Inter-Regular",
            textTransform: "uppercase",
            fontSize: "0.8rem",
          }}
        >
          {stringAvatar(user.name, user.color).children}
        </div>
      </Tooltip>
    );
  };

  //image avatar
  const renderImageAvatar = (url: string) => {
    return (
      <Tooltip title={username} arrow>
        {/* <img
          src={url}
          alt={username}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            margin: 3,
          }}
        /> */}
        <Image
          src={url}
          alt={username || ""}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            margin: 3,
          }}
        />
      </Tooltip>
    );
  };

  // Custom icon avatar
  const renderCustomIconAvatar = (icon: React.ReactNode) => {
    return (
      <Tooltip title={username} arrow>
        <div
          style={{
            width: "20px",
            height: "20px",
            // borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 1,
          }}
        >
          <span
            style={{
              width: "100%", // Ensure the icon fits the container
              height: "100%", // Ensure the icon fits the container
            }}
          >
            {customIcon}

            <AvatarText
              style={{
                fontSize: "6px",
              }}
            >
              {username}
            </AvatarText>
          </span>
        </div>
      </Tooltip>
    );
  };

  //based on length, avatar or select
  const renderUserValueAvatars = () => {
    if (userLists?.length && userLists.length <= 3) {
      return userLists.map((user) => (
        <React.Fragment key={user.user.name}>
          {renderStringAvatar(user.user)}
        </React.Fragment>
      ));
    } else {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormControl sx={{ width: "100%", height: "20px" }}>
            <Select
              variant="standard"
              disableUnderline
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              onOpen={() => setSelectClicked(true)}
              onClose={() => setSelectClicked(false)}
              MenuProps={{
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                MenuListProps: {
                  disablePadding: true,
                },
              }}
              sx={{ marginRight: "25px" }}
            >
              {userLists?.map((user) => (
                <MenuItem key={user.user.name} value={user.user.name}>
                  {renderStringAvatar(user.user)}
                  {selectClicked && (
                    <span style={{ marginLeft: 8, marginTop: "-5px" }}>
                      {user.user.name}
                    </span>
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      );
    }
  };

  //based on type, render avatar
  const renderAvatar = () => {
    if (avatarType === "userValue") {
      return renderUserValueAvatars();
    } else if (avatarType === "image" && imageUrl) {
      return renderImageAvatar(imageUrl);
    } else if (avatarType === "customIcon" && customIcon) {
      return renderCustomIconAvatar(customIcon);
    }
    return null;
  };

  return (
    <div>
      <Stack direction="row" spacing={0.5}>
        {renderAvatar()}
      </Stack>
    </div>
  );
};

export default GAvatar;
