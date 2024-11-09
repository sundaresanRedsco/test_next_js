import React, { useState } from "react";
import theme from "../../../Theme/theme";
import { Pagination } from "@mui/material";

export default function TestRunnerPagination(props: any) {
  const { totalPageVal, pageVal, onGettingPageValue } = props;
  // console.log("ChecKVal: ", totalPageVal, pageVal)

  const [page, setPage] = useState(pageVal);

  return (
    <section className="customPagination">
      <Pagination
        count={totalPageVal}
        page={page}
        onChange={(event, value) => {
          setPage(value);
          onGettingPageValue(value);
        }}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: theme.palette.primaryPurple.main, // Change the background color for the active page
            color: theme.palette.primaryWhite.main, // Change the text color for the active page
            fontSize: "0.6rem",
          },
          display: "flex",
          justifyContent: "center",
        }}
      />
    </section>
  );
}
