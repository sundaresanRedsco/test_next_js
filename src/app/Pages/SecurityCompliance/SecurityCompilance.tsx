import React, { useEffect, useState } from "react";
import ApiRiskHeader from "../../Components/ApiRisk/apiRiskHeader";
import { Box, Card, Grid, styled, Typography } from "@mui/material";
import theme from "../../../Theme/theme";
import RadioCheckboxComponent from "../../Components/Global/radioCheckboxComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
// import { PrimaryTypography } from '../Api Management/apiManageDashboard';
import GButton from "../../Components/Global/GlobalButtons";
import CompilanceTable from "../../Components/ApiManagement/CompilanceTable/CompilanceTable";
import { PrimaryTypography } from "../../Styles/signInUp";
import hipaimage from "../../Assests/images/hipa.png";
import gdprs from "../../Assests/images/gdp.png";
import pci from "../../Assests/images/pciimage.png";
import fism from "../../Assests/images/fismaImage-1.png";
import pdp from "../../Assests/images/pdpImage.jpg";
import SecurityIcon from "@mui/icons-material/Security";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import {
  GetStandards,
  SecurityCompilanceReducer,
} from "../../Redux/SecurityCompilance/SecurityCompilanceReducer";
import { updateSessionPopup } from "../../Redux/commonReducer";
import GlobalLoader from "../../Components/Global/GlobalLoader";
import GlobalCircularLoader from "../../Components/Global/GlobalCircularLoader";
import Image from "next/image";

export const SecondaryTypography = styled(Typography)`
  font-family: Inter-Regular;
  color: ${theme.palette.primaryText.main};
  font-weight: 500;
  font-size: 0.6rem;
  wordwrap: break-word;
`;

function SecurityCompilance() {
  const dispatch = useDispatch<any>();

  const { loading, collectionsLists, standardLoading } = useSelector<
    RootStateType,
    SecurityCompilanceReducer
  >((state) => state.compilances.securityCompilanes);

  console.log(collectionsLists, "collectionsLists");

  const [securityDrawer, setSecurityDrawer] = useState(false);
  const [standardName, setStandardName] = useState<any>();
  const [standardId, setStandardId] = useState<any>();

  console.log(standardName, "standardNamestandardName");

  const handleCompilanceTable = () => {
    setSecurityDrawer(true);
  };

  const handleCloseCompilanceTable = () => {
    setSecurityDrawer(false);
  };

  useEffect(() => {
    // if (wsid) {
    dispatch(GetStandards())
      .unwrap()
      .then()
      .catch((errr: any) => {
        if (errr.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        }
      });
    // }
    console.log("samplesdsd");

    return () => {
      console.log("Component is unmounting");
    };
  }, []);

  return (
    <div>
      <ApiRiskHeader
        label={"Security & Compliance"}
        icon={<SecurityIcon style={{ fontSize: "18px" }} />}
      />

      <div>
        <Box
          sx={{
            marginTop: "1rem",
            backgroundColor: theme.palette.mainWhite.main,
            marginBottom: "10px",
            padding: "1rem",
            height: "100vh",
            boxSizing: "border-box",
          }}
        >
          <PrimaryTypography
            style={{
              fontWeight: "600",
            }}
          >
            List of Standards
          </PrimaryTypography>
          <Grid container spacing={2} style={{ position: "relative" }}>
            {collectionsLists?.length <= 0 && (
              <GlobalCircularLoader open={standardLoading} />
            )}
            {collectionsLists.map((policy: any, index: any) => (
              <Grid item xs={12} sm={4}>
                <Card
                  variant="outlined"
                  style={{
                    height: "70px",
                    margin: "20px 10px",
                    padding: "10px",
                  }}
                >
                  <Grid container>
                    <Grid item xs={3}>
                      <Box
                        width={"50px"}
                        height={"50px"}
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "left",
                        }}
                      >
                        {/* {val?.icon} */}
                        {policy?.standard_name === "HIPPA" ? (
                          <Image
                            src={hipaimage}
                            alt=""
                            style={{ height: "100%", width: "100%" }}
                          />
                        ) : policy?.standard_name === "GDPR" ? (
                          <Image
                            src={gdprs}
                            alt=""
                            style={{ height: "100%", width: "100%" }}
                          />
                        ) : policy?.standard_name === "PCI_DSS" ? (
                          <Image
                            src={pci}
                            alt=""
                            style={{ height: "100%", width: "100%" }}
                          />
                        ) : policy?.standard_name === "FISMA" ? (
                          <Image
                            src={fism}
                            alt=""
                            style={{ height: "100%", width: "100%" }}
                          />
                        ) : policy?.standard_name === "PDPL" ? (
                          <Image
                            src={pdp}
                            alt=""
                            style={{ height: "100%", width: "100%" }}
                          />
                        ) : (
                          <Image
                            src={hipaimage}
                            alt=""
                            style={{ height: "100%", width: "100%" }}
                          />
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={7}>
                      <div style={{ padding: "5px 0px" }}>
                        <PrimaryTypography
                          style={{
                            fontWeight: 900,
                          }}
                        >
                          {policy?.standard_name}
                        </PrimaryTypography>
                        <SecondaryTypography style={{ fontSize: "0.5rem" }}>
                          {/* {val?.description} */}
                          {policy?.standard_name === "HIPPA"
                            ? "Hippa offers APIs inside the data"
                            : policy?.standard_name === "GDPR"
                            ? "Gdpr offers APIs inside the data"
                            : policy?.standard_name === "PCI_DSS"
                            ? "PciDss offers APIs inside the data"
                            : policy?.standard_name === "FISMA"
                            ? "Fisma offers APIs inside the data"
                            : policy?.standard_name === "PDPL"
                            ? "Pdpl offers APIs inside the data"
                            : "Hippa offers APIs inside the data"}
                        </SecondaryTypography>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                      >
                        <div style={{ marginRight: "10px" }}>
                          <GButton
                            buttonType="primary"
                            label={"Configure"}
                            onClickHandler={() => {
                              handleCompilanceTable();
                              setStandardName(policy?.standard_name);
                              setStandardId(policy?.id);
                              // handleToggle(index);
                            }}
                            //   onClickHandler={handleCompilanceTable}
                          />
                        </div>
                        <div
                          style={{
                            marginBottom: "10px",
                            position: "relative",
                          }}
                        ></div>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <CompilanceTable
          open={securityDrawer}
          nameData={standardName}
          //   types={typeData}
          idData={standardId}
          // nestedData={buttonVisibility}
          onClose={handleCloseCompilanceTable}
        />
      </div>
    </div>
  );
}

export default SecurityCompilance;
