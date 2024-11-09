import { FormControl, MenuItem, Select, Stack, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../Redux/store";
import { FlowReducer } from "../../../Redux/apiManagement/flowReducer";

const AvatarComponent = () => {
  const { userLists } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );

  console.log(userLists, "usersList");

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectClicked, setSelectClicked] = useState(false);

  function stringAvatar(name: any) {
    const firstName = name?.name?.split(" ")[0];
    const firstLetter = firstName ? firstName[0] : "";
    const secondLetter = firstName && firstName.length > 1 ? firstName[1] : "";
    const combinedLetters = firstLetter || secondLetter;

    // const bgColor = stringToColor(name);
    const bgColor = name?.color;

    return {
      sx: {
        bgColor: bgColor,
        color: "#fff",
      },
      children: combinedLetters,
    };
  }

  function AvatarComponent({ sx, children, tooltipVal }: any) {
    return (
      <Tooltip title={tooltipVal} arrow>
        <div
          style={{
            width: 23,
            height: 23,
            borderRadius: "50%",
            backgroundColor: sx?.bgColor,
            color: sx?.color || "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 3,
            fontFamily: "Inter-Regular",
            textTransform: "uppercase",
            fontSize: "0.8rem",
          }}
        >
          {children}
        </div>
      </Tooltip>
    );
  }

  const renderAvatars = () => {
    if (userLists?.length <= 3) {
      return userLists?.map((user: any) => (
        <AvatarComponent
          key={user.user?.name}
          {...stringAvatar(user.user)}
          tooltipVal={user.user?.name}
        />
      ));
    } else {
      return (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <div style={{
                    marginRight:'-15px'
                  }}>
                    <AvatarComponent
                      key={avatarData[0]?.name}
                      {...stringAvatar(avatarData[0]?.name)}
                    />
                  </div> */}
            <FormControl sx={{ width: "100%", height: "20px" }}>
              <Select
                variant="standard"
                disableUnderline
                // defaultValue={avatarData[0]?.name}
                value={selectedUser}
                onChange={(e: any) => {
                  setSelectedUser(e.target.value);
                }}
                onOpen={() => {
                  setSelectClicked(true);
                }}
                onClose={() => {
                  setSelectClicked(false);
                }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  // getContentAnchorEl: null,
                  MenuListProps: {
                    disablePadding: true,
                  },
                }}
                sx={{
                  marginRight: "25px",
                }}
              >
                {userLists?.map((user: any) => (
                  <MenuItem key={user.user?.name} value={user.user?.name}>
                    <AvatarComponent {...stringAvatar(user.user)} />
                    {selectClicked && (
                      <span style={{ marginLeft: 8, marginTop: "-5px" }}>
                        {user.user?.name}
                      </span>
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </>
      );
    }
  };

  return (
    <div style={{ marginTop: "-10px" }}>
      <Stack direction="row" spacing={0.5}>
        {renderAvatars()}
      </Stack>
    </div>
  );
};

export default AvatarComponent;
