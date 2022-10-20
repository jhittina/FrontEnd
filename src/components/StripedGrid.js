import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 489,
    editable: false,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 489,
    editable: false,
  },
  {
    field: "type",
    headerName: "Type",
    width: 489,
    editable: false,
  },
];

export default function StripedGrid(props) {
  const { row, loading, onHandleClick } = props;
  return (
    <div style={{ height: 400, width: "100%" }}>
      <StripedDataGrid
        onSelectionModelChange={(itm) => onHandleClick(itm)}
        loading={loading}
        getRowId={(rows) => rows._id}
        rows={!row ? [] : row?.data}
        columns={columns}
        components={{
          Pagination: false,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
      />
    </div>
  );
}
