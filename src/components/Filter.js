import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton, makeStyles } from "@material-ui/core";
import OutboxIcon from "@mui/icons-material/Outbox";
import SortIcon from "@mui/icons-material/Sort";
import Controls from "./controls/Controls";
import swal from "sweetalert";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  datePicker: {
    width: "90%",
    margin: "5%",
  },
  submitButton: {
    width: "90%",
    margin: "5%",
  },
  brickType: {
    width: "100%",
    marginLeft: "5%",
  },
  newButton: {
    left: "355",
  },
  scroll: {
    "&::-webkit-scrollbar": {
      width: 7,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: `1px solid slategrey`,
    },
  },
}));

export default function Filter(props) {
  const { onFilterQuery } = props;
  const classes = useStyles();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [brickType, setBrickType] = useState(null);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const handleFilter = () => {
    let queryFilter = {};
    if (startDate) {
      if (startDate & endDate) {
        var eDate = new Date(endDate);
        var sDate = new Date(startDate);
        if (sDate > eDate) {
          swal({
            title: "Warning!",
            text: "Start Date Should be Smaller than End Date!",
            icon: "info",
            button: "OK!",
          });
        }
        const queryStartDate = moment(startDate).format("YYYY/MM/DD");
        const queryendDate = moment(endDate).format("YYYY/MM/DD");
        queryFilter.queryDate = { queryStartDate, queryendDate };
      } else {
        swal({
          title: "Warning!",
          text: "Please Select Start Date and End Date!",
          icon: "info",
          button: "OK!",
        });
      }
    }
    if (brickType) {
      queryFilter.queryBrickType = brickType;
    }
    onFilterQuery(queryFilter);
  };

  const genderItems = [
    { id: "4 Inch Brick", title: "4 Inch Brick" },
    { id: "6 Inch Brick", title: "6 Inch Brick" },
  ];

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Controls.DatePicker
          name="startDate"
          label="Start Date"
          className={classes.datePicker}
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <Controls.DatePicker
          name="endDate"
          label="End Date"
          className={classes.datePicker}
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
        <Divider />
        <Controls.RadioGroup
          name="bricktype"
          value={brickType}
          className={classes.brickType}
          onChange={(event) => setBrickType(event.target.value)}
          items={genderItems}
        />

        <Controls.Button
          text="Submit"
          variant="outlined"
          startIcon={<OutboxIcon />}
          className={classes.submitButton}
          onClick={() => {
            handleFilter();
          }}
        />
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Controls.Button
            text="Filter"
            variant="outlined"
            startIcon={<SortIcon />}
            className={classes.newButton}
            onClick={toggleDrawer(anchor, true)}
          ></Controls.Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
