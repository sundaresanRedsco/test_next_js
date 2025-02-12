import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import theme from "../../../Theme/theme";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

export default function CustomPagination(props: any) {
  const { pageCountVal, pageVal } = props;

  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <section className="customPagination">
      <Pagination
        count={pageCountVal ? pageCountVal : pageCount}
        page={pageVal ? pageVal : page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: theme.palette.primaryPurple.main, // Change the background color for the active page
            color: theme.palette.primaryWhite.main, // Change the text color for the active page
          },
        }}
      />
    </section>
  );
}
