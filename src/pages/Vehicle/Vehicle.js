import React, { useState, useEffect } from "react";
import EmployeeForm from "./VehicleForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import { Paper, makeStyles, Toolbar, TablePagination } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "../../components/Popup";
import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "../../components/SimpleBackdrop";
import { useDispatch, useSelector } from "react-redux";
import {
  getVehicles,
  createVehicle,
  deleteVehicle,
  clearErrorState,
} from "../../services/VehicleSlice";
import swal from "sweetalert";
import StripedGrid from "../../components/StripedGrid";
// import Filter from "../../components/Filter";

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

export default function Vehicle() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  var {
    loading,
    data,
    error,
    createdData,
    deletedData,
    createError,
    deleteError,
    updateError,
  } = useSelector((state) => ({
    ...state.Vehicle,
  }));
  const pages = [10];
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(pages[page]);
  const [id, setId] = useState(null);

  const [arg, setArg] = useState({
    token: token,
    params: {
      page: 0,
      limit: 10,
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      dispatch(getVehicles({ arg }));
    }
  }, [navigate, createdData, page, deletedData, arg, token, dispatch]);

  function refreshPage() {
    window.location.reload(false);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let queryArg = arg;
    queryArg.params.page = newPage;
    setArg({
      ...queryArg,
    });
  };
  const handleClick = (id) => {
    // 👇️ take parameter passed from Child component
    setId(id);
  };

  if (createError) {
    swal(`${createError}`, {
      icon: "error",
      buttons: true,
    });
    dispatch(clearErrorState({ arg }));
  }
  if (deleteError) {
    swal(`${deleteError}`, {
      icon: "error",
      buttons: true,
    });
    dispatch(clearErrorState({ arg }));
  }
  if (updateError) {
    swal(`${updateError}`, {
      icon: "error",
      buttons: true,
    });
    dispatch(clearErrorState({ arg }));
  }

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      width: 250,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name of Owner",
      width: 250,
      editable: false,
    },
    {
      field: "address",
      headerName: "Address",
      width: 250,
      editable: false,
    },
    {
      field: "vehicalNumber",
      headerName: "Vehical Number",
      width: 250,
      editable: false,
    },
    {
      field: "price",
      headerName: "Price Per Trip",
      width: 250,
      editable: false,
    },
    {
      field: "conatctNumber",
      headerName: "Conatct Number",
      width: 250,
      editable: false,
    },
    {
      field: "vehicalType",
      headerName: "Vehical Type",
      width: 250,
      editable: false,
    },
  ];

  const addOrEdit = async (employee, resetForm) => {
    console.log(employee, "@@@@@@@@@@@@@@@@@@@@@@@@@");
    var arg = {};
    if (!employee._id) {
      // updating the data
      arg.body = employee;
      arg.token = token;
      dispatch(createVehicle({ arg }));
    } else {
      // creating the new data
      arg.body = employee;
      arg.token = token;
      dispatch(createVehicle({ arg }));
      setId(null);
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
        dispatch(deleteVehicle({ arg }));
        setId(null);
        dispatch(getVehicles({ token }));
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

  // const filterQuery = (query) => {
  //   let queryParams = {};
  //   const { queryDate, queryBrickType } = query;
  //   if (queryBrickType) {
  //     queryParams.type = queryBrickType;
  //   }
  //   if (queryDate) {
  //     queryParams.startDate = queryDate?.queryStartDate;
  //     queryParams.endDate = queryDate?.queryendDate;
  //   }
  //   let queryArg = arg;
  //   queryArg.params = {
  //     ...queryParams,
  //   };
  //   setArg({ ...queryArg });
  // };
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  console.log(data, "data");
  return (
    <>
      <PageHeader
        subTitle="Daily Vehicle Management"
        title="Vehicle"
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
            onClick={() => refreshPage()}
          />
          {/* <Filter onFilterQuery={filterQuery} /> */}
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
              columns={columns}
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
        title="Vehicle Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  );
}
