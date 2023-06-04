import React, { useState, useEffect } from "react";
import EmployeeForm from "./CustomerForm";
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
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import {
  getCustomers,
  createCustomer,
  deleteCustomer,
  clearErrorState,
  customerAddressCred,
} from "../../services/CustomerSlice";
import swal from "sweetalert";
import StripedGrid from "../../components/StripedGrid";
import Filter from "../../components/Filter";
import AddressPopup from "../../components/AddressPopup";
import CustomerAddressForm from "./CustomerAddressForm";

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
  addressButton: {
    position: "absolute",
    marginLeft: "480",
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

export default function Customer() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [addressEvent, setAddressEvent] = useState(false);
  const [addressRecordForShow, setAddressRecordForShow] = useState(null);
  const [addressOpenPopup, setAddressOpenPopup] = useState(false);
  const [addressRecordForEdit, setAddressRecordForEdit] = useState(null);
  const [addressOpenPopupEdit, setAddressOpenPopupEdit] = useState(false);
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
    addressCredError,
    addressCredData,
  } = useSelector((state) => ({
    ...state.Customer,
  }));
  const pages = [10];
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(pages[page]);
  const [id, setId] = useState(null);
  const [addressId, setAddressId] = useState(null);

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
      dispatch(getCustomers({ arg }));
    }
  }, [
    navigate,
    createdData,
    addressCredData,
    page,
    deletedData,
    arg,
    token,
    dispatch,
  ]);

  function refreshPage() {
    window.location.reload(false);
  }

  const challenPdf = async () => {
    const pdfMake = require("pdfmake/build/pdfmake.js");
    const pdfFonts = require("pdfmake/build/vfs_fonts.js");
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const docDefinition = {
      content: [
        {
          layout: "noBorders",
          table: {
            widths: ["*", "*"],
            body: [
              [
                {
                  text: "Payment Slip 1:",
                  style: "header",
                },
                {
                  text: "Payment Slip 2:",
                  style: "header",
                },
              ],
              [
                {
                  text: [
                    { text: "Consumer Name:", style: "label" },
                    { text: "John Doe", style: "value" },
                  ],
                },
                {
                  text: [
                    { text: "Consumer Name:", style: "label" },
                    { text: "Jane Smith", style: "value" },
                  ],
                },
              ],
              [
                {
                  text: [
                    { text: "Address:", style: "label" },
                    { text: "123 Main St", style: "value" },
                  ],
                },
                {
                  text: [
                    { text: "Address:", style: "label" },
                    { text: "456 Park Ave", style: "value" },
                  ],
                },
              ],
              [
                {
                  text: [
                    { text: "Payment Amount:", style: "label" },
                    { text: "$100.00", style: "value" },
                  ],
                },
                {
                  text: [
                    { text: "Payment Amount:", style: "label" },
                    { text: "$200.00", style: "value" },
                  ],
                },
              ],
              [
                {
                  text: [
                    { text: "Payment Date:", style: "label" },
                    { text: "01/01/2023", style: "value" },
                  ],
                },
                {
                  text: [
                    { text: "Payment Date:", style: "label" },
                    { text: "01/01/2023", style: "value" },
                  ],
                },
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        label: {
          fontSize: 14,
          bold: true,
        },
        value: {
          fontSize: 14,
          margin: [0, 0, 0, 10],
        },
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.pipe(fs.createWriteStream("output.pdf"));
    pdfDoc.end();
    console.log("done");
  };
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
  const addressHandleClick = (id) => {
    // 👇️ take parameter passed from Child component
    setAddressId(id);
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
  if (addressCredError) {
    swal(`${addressCredError}`, {
      icon: "error",
      buttons: true,
    });
    dispatch(clearErrorState({ arg }));
  }
  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      width: 300,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: false,
    },
    {
      field: "brickType",
      headerName: "Brick Type",
      width: 300,
      editable: false,
    },
    {
      field: "poNumber",
      headerName: "Po Number",
      width: 300,
      editable: false,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 300,
      editable: false,
    },
  ];
  const addressColumns = [
    {
      field: "address",
      headerName: "Address",
      width: 300,
      editable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 300,
      editable: false,
    },
  ];

  const addOrEdit = async (employee, resetForm) => {
    var arg = {};
    if (!employee._id) {
      // updating the data
      arg.body = employee;
      arg.token = token;
      dispatch(createCustomer({ arg }));
    } else {
      // creating the new data
      arg.body = employee;
      arg.token = token;
      dispatch(createCustomer({ arg }));
      setId(null);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };
  const addOrEditAdress = async (employee, resetForm) => {
    employee.id = id;
    employee.action = addressEvent;
    arg.body = employee;
    arg.token = token;
    dispatch(customerAddressCred({ arg }));

    resetForm();
    setAddressRecordForEdit(null);
    setAddressOpenPopupEdit(false);
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
        dispatch(deleteCustomer({ arg }));
        setId(null);
        dispatch(getCustomers({ token }));
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
  const deleteAddressRecords = async (data) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this requested data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        arg.token = token;
        dispatch(customerAddressCred({ arg }));
        // setId(null);
        // dispatch(getCustomers({ token }));
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
    let queryParams = {};
    const { queryDate, queryBrickType } = query;
    if (queryBrickType) {
      queryParams.type = queryBrickType;
    }
    if (queryDate) {
      queryParams.startDate = queryDate?.queryStartDate;
      queryParams.endDate = queryDate?.queryendDate;
    }
    let queryArg = arg;
    queryArg.params = {
      ...queryParams,
    };
    setArg({ ...queryArg });
  };
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  // const addressOpenInPopup = (item) => {
  //   setAddressRecordForShow(item);
  //   setAddressOpenPopup(true);
  // };
  const addressOpenInPopup = (data) => {
    data = data.map((item, index) => ({ ...item, _id: index }));
    let address = { data: [...data] };
    setAddressRecordForShow(address);
    setAddressOpenPopup(true);
  };
  return (
    <>
      <PageHeader
        subTitle="Daily Customer Management"
        title="Customer"
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
            onClick={() => challenPdf()}
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
          <Controls.Button
            text="Address"
            variant="outlined"
            startIcon={<EditIcon />}
            className={classes.addressButton}
            disabled={id == null ? "disabled" : ""}
            onClick={() => {
              const item = data[0]?.data.filter((obj) => {
                return obj._id === id[0];
              });
              addressOpenInPopup(item[0]?.address);
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
          </>
        ) : (
          error
        )}
      </Paper>
      <Popup
        title="Customer Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <AddressPopup
        title="Address Page"
        openPopup={addressOpenPopup}
        setOpenPopup={setAddressOpenPopup}
      >
        <Controls.Button
          text="Delete"
          variant="outlined"
          startIcon={<DeleteIcon />}
          disabled={addressId == null ? "disabled" : ""}
          // className={classes.deleteButton}
          onClick={() => {
            setAddressEvent("delete");
            const item = data[0]?.data.filter((obj) => {
              return obj._id === id[0];
            });
            deleteAddressRecords(item);
          }}
        />
        <Controls.Button
          text="Edit"
          variant="outlined"
          startIcon={<EditIcon />}
          disabled={addressId == null ? "disabled" : ""}
          onClick={() => {
            setAddressEvent("update");
            const item = data[0]?.data.filter((obj) => {
              return obj._id === id[0];
            });
            const addressData = item[0].address[addressId];
            setAddressOpenPopupEdit(true);
            setAddressRecordForEdit(addressData);
          }}
        />
        <Controls.Button
          text="Add New"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            setAddressEvent("create");
            setAddressOpenPopupEdit(true);
            setAddressRecordForEdit(null);
          }}
        />
        <StripedGrid
          row={addressRecordForShow}
          loading={loading}
          columns={addressColumns}
          onHandleClick={addressHandleClick}
        />
      </AddressPopup>
      <Popup
        title="Address Page"
        openPopup={addressOpenPopupEdit}
        setOpenPopup={setAddressOpenPopupEdit}
      >
        <CustomerAddressForm
          recordForEdit={addressRecordForEdit}
          addOrEditAdress={addOrEditAdress}
          addressEvent={addressEvent}
        />
      </Popup>
    </>
  );
}
