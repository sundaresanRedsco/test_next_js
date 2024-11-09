import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
  TertiarySignInUPTypography,
} from "@/app/Styles/signInUp";
import { Box, IconButton, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import GIconButton from "../../global/GIconButton";
import { Edit } from "@mui/icons-material";
import GInput from "../../global/GInput";

type Props = {
  name: string | undefined;
  description: string | undefined;
  environments: any;
  handleSaveProject: (data: any) => void;
  handleSaveEnv: (data: any) => void;
  data: any;
};

const ItemCard = ({ title, about, handleSaveEnv, data }: any) => {
  const [isEdit, setisEdit] = useState(false);
  const [tempData, setTempData] = useState<any>(null);
  const [isClicked, setisClicked] = useState(false);
  const handleEdit = () => {
    setisEdit(true);
    setisClicked(true);
    setTempData(data);
  };
  const [formDatas, setformDatas] = useState({
    project_id: data?.project_id,
    api_project_name: "",
    description: "",
    pin_project: true,
  });
  const handleOnchange = (e: any) => {
    const { name, value } = e.target;
    setformDatas((prev) => ({ ...prev, [name]: value }));
  };
  const componentRef = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (
      componentRef?.current &&
      !componentRef?.current?.contains(event.target)
    ) {
      setisEdit(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!isEdit && isClicked) {
      if (
        formDatas?.api_project_name != tempData?.name ||
        formDatas?.description != tempData?.description
      ) {
        handleSaveEnv(formDatas);
        setTempData(null);
      }
      setisClicked(false);
    }
  }, [isEdit, isClicked]);
  useEffect(() => {
    if (data) {
      setformDatas({
        project_id: data?.project_id,
        api_project_name: data?.name,
        description: data?.description,
        pin_project: data?.is_pinned,
      });
    }
  }, [data]);
  return (
    <Box
      sx={{ display: "flex", gap: 1, alignItems: "flex-start", width: "100%" }}
    >
      <Box
        sx={{
          height: "16px",
          width: "16px",
          borderRadius: "3px",
          background: "#D9D9D9",
          marginTop: "5px",
        }}
      />
      <Stack
        ref={componentRef}
        sx={{ justifyContent: "flex-start", gap: 1, width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {isEdit ? (
            <GInput
              smallInput={true}
              width={"100%"}
              value={formDatas?.api_project_name}
              height={"28px"}
              onChangeHandler={handleOnchange}
              name={"api_project_name"}
            />
          ) : (
            <SecondarySignInUPTypography
              sx={{
                color: "white",
                marginTop: "4px",
              }}
            >
              {formDatas?.api_project_name}
            </SecondarySignInUPTypography>
          )}
          {!isEdit && (
            <IconButton
              sx={{
                marginTop: "3px",
              }}
              onClick={handleEdit}
              size="small"
            >
              <Edit sx={{ fontSize: "11px", color: "white" }} />
            </IconButton>
          )}
        </Box>
        {isEdit ? (
          <GInput
            smallInput={true}
            width={"100%"}
            value={formDatas.description}
            height={"28px"}
            fontWeight={"300"}
            onChangeHandler={handleOnchange}
            name={"description"}
          />
        ) : (
          <TertiarySignInUPTypography
            sx={{
              color: "white",
              fontSize: "10px",
            }}
          >
            {formDatas?.description}
          </TertiarySignInUPTypography>
        )}
      </Stack>
    </Box>
  );
};

export default function ResourceCard({
  name,
  description,
  environments,
  handleSaveProject,
  handleSaveEnv,
  data,
}: Props) {
  const [isEdit, setisEdit] = useState(false);
  const [formData, setformData] = useState<any>({
    group_id: data?.group_id,
    group_name: "",
    description: "",
  });
  const [tempData, setTempData] = useState<any>(null);
  const [isClicked, setisClicked] = useState(false);
  const componentRef = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (
      componentRef?.current &&
      !componentRef?.current?.contains(event.target)
    ) {
      setisEdit(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (data) {
      setformData({
        group_id: data?.group_id,
        group_name: data?.name,
        description: "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (!isEdit && isClicked) {
      if (formData?.group_name != tempData?.name) {
        handleSaveProject(formData);
        setTempData(null);
      }
      setisClicked(false);
    }
  }, [isEdit, isClicked]);

  const handleOnchange = (e: any) => {
    const { name, value } = e.target;
    setformData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleEdit = () => {
    setTempData(data);
    setisEdit(true);
    setisClicked(true);
  };
  return (
    <Stack
      sx={{
        width: "100%",
        borderRadius: "10px",
        background: "#241D35",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          height: "60px",
          border: "1px solid #FFFFFF80",
          borderRadius: "10px",
          position: "relative",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
            background: "#362F47",
            borderRight: "1px solid #FFFFFF80",
            borderRadius: "10px 0 0 10px",
            height: "100%",
          }}
        >
          <PrimarySignInUPTypography
            sx={{
              color: "white",
              fontSize: "15px",
            }}
          >
            Project
          </PrimarySignInUPTypography>
        </Box>
        <Stack
          ref={componentRef}
          sx={{ padding: "3px", justifyContent: "center", width: "75%" }}
        >
          {isEdit ? (
            <GInput
              smallInput={true}
              width={"100%"}
              value={formData?.group_name}
              height={"28px"}
              onChangeHandler={handleOnchange}
              name={"group_name"}
            />
          ) : (
            <PrimarySignInUPTypography
              sx={{
                color: "white",
                fontSize: "15px",
              }}
            >
              {formData?.group_name}
            </PrimarySignInUPTypography>
          )}
          {/* {isEdit ? (
            <GInput
              smallInput={true}
              width={"100%"}
              value={formData?.description}
              height={"28px"}
              onChangeHandler={handleOnchange}
              name={"description"}
            />
          ) : (
            <TertiarySignInUPTypography
              sx={{
                color: "white",
                fontSize: "10px",
              }}
            >
              {description}
            </TertiarySignInUPTypography>
          )} */}
        </Stack>
        <GIconButton
          icon={<Edit fontSize="small" />}
          onClick={handleEdit}
          customStyle={{
            position: "absolute",
            right: 14,
          }}
        />
      </Box>
      <Stack sx={{ padding: "15px", gap: 2 }}>
        <PrimarySignInUPTypography
          sx={{
            color: "white",
            fontSize: "15px",
          }}
        >
          Environments
        </PrimarySignInUPTypography>
        <Stack sx={{ width: "100%", paddingLeft: 5, gap: "8px" }}>
          {environments.length > 0 ? (
            environments?.map((env: any, index: number) => {
              return (
                <ItemCard
                  data={env}
                  key={index}
                  title={env?.name}
                  about={env?.about}
                  handleSaveEnv={handleSaveEnv}
                />
              );
            })
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SecondarySignInUPTypography sx={{ color: "gray" }}>
                No environments available
              </SecondarySignInUPTypography>
            </Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
