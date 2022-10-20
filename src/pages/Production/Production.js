import React, { useState, useEffect } from "react";
import EmployeeForm from "./ProductionForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  TablePagination,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "../../components/SimpleBackdrop";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductions,
  createProduction,
  deleteProduction,
} from "../../services/ProductionSlice";
import swal from "sweetalert";
import StripedGrid from "../../components/StripedGrid";
import Filter from "../../components/Filter";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  deleteButton: {
    position: "absolute",
    marginRight: "20px",
  },
  editButton: {
    position: "absolute",
    marginLeft: "130",
  },
  resetButton: {
    position: "absolute",
    marginLeft: "240",
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

const headCells = [
  { id: "date", label: "Date" },
  { id: "brickType", label: "Brick Type" },
  { id: "quantity", label: "Quantity" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Production() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const token = localStorage.getItem("token");
  const [records, setRecords] = useState([]);
  const dispatch = useDispatch();
  const { loading, data, body, edit, error } = useSelector((state) => ({
    ...state.app,
  }));
  const pages = [6];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    var arg = {};
    arg.token = token;
    arg.params = {
      page: page,
      limit: 6,
    };
    dispatch(getProductions({ arg }));
    // Runs only on the first render
    setRecords(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records, navigate, 0]);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };
  function refreshPage() {
    window.location.reload(false);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    var arg = {};
    arg.token = token;
    arg.params = {
      page: newPage,
      limit: 6,
    };
    dispatch(getProductions({ arg }));
  };

  const handleClick = (id) => {
    // 👇️ take parameter passed from Child component
    setId(id);
  };

  const addOrEdit = async (employee, resetForm) => {
    var arg = {};
    if (!employee._id) {
      arg.body = employee;
      arg.token = token;
      dispatch(createProduction({ arg }));
      dispatch(getProductions({ token }));
      setRecords(data);
      swal("Created!", "Good Job!", "success", {
        icon: "success",
        buttons: false,
        timer: 1000,
      });
    } else {
      arg.body = employee;
      arg.token = token;
      dispatch(createProduction({ arg }));
      dispatch(getProductions({ token }));
      setRecords(data);
      setId(null);
      swal("Updated!", "Good Job!", "success", {
        icon: "success",
        buttons: false,
        timer: 1000,
      });
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const deleteRecords = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this requested data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var arg = {};
        arg.id = id;
        arg.token = token;
        dispatch(deleteProduction({ arg }));
        setId(null);
        dispatch(getProductions({ token }));
        setRecords(data);
        swal("Poof! Your requested data has been deleted!", {
          icon: "success",
          buttons: false,
          timer: 1000,
        });
      } else {
        swal("Your requested data is safe!", {
          icon: "error",
          buttons: false,
          timer: 1000,
        });
      }
    });
  };
  const filterQuery = (query) => {
    const { queryDate, queryBrickType } = query;
    const params = {
      startDate: queryDate?.queryStartDate,
      endDate: queryDate?.queryendDate,
      type: queryBrickType,
    };
    dispatch(getProductions({ token, params }));
    setRecords(data);
  };
  const openInPopup = (item) => {
    console.log(item);
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  return (
    <>
      <PageHeader
        subTitle="Daily Production Management"
        title="Production"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Button
            text="Delete"
            variant="outlined"
            startIcon={<DeleteIcon />}
            disabled={id == null ? "disabled" : ""}
            className={classes.deleteButton}
            onClick={() => {
              deleteRecords(id);
            }}
          />
          <Controls.Button
            text="Edit"
            variant="outlined"
            startIcon={<EditIcon />}
            className={classes.editButton}
            disabled={id == null ? "disabled" : ""}
            onClick={() => {
              const item = data[0]?.data.filter((obj) => {
                return obj._id === id[0];
              });
              openInPopup(item[0]);
            }}
          />
          <Controls.Button
            text="Reset"
            variant="outlined"
            startIcon={<RefreshIcon />}
            className={classes.resetButton}
            disabled={id == null ? "disabled" : ""}
            onClick={() => refreshPage()}
          />
          <Filter onFilterQuery={filterQuery} />
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        {loading && <SimpleBackdrop />}
        {loading === false ? (
          <>
            <StripedGrid
              row={data[0]}
              loading={loading}
              onHandleClick={handleClick}
            />
            <TablePagination
              component="div"
              page={page}
              rowsPerPageOptions={pages}
              rowsPerPage={rowsPerPage}
              count={data[0]?.totalCount}
              onChangePage={handleChangePage}
            />
          </>
        ) : (
          error
        )}
      </Paper>
      <Popup
        title="Production Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  );
}
