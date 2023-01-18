import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export default function ColorChips(props) {
  const { label, color } = props;
  const classes = useStyles();
  return (
    <Stack spacing={3} alignItems="left">
      <Stack direction="row" spacing={1}>
        <Chip label={label || "primary"} color={color || "primary"} />
      </Stack>
    </Stack>
  );
}
