import React, { useState, useEffect } from 'react'
import EmployeeForm from "./ProductionForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { useNavigate } from "react-router-dom";
// import { useProductionPostMutation, useProductionUpdatePostMutation, useGetAllProductionsQuery } from '../../services/productionService';
import SimpleBackdrop from '../../components/SimpleBackdrop';
import { useDispatch, useSelector } from "react-redux";
import { getProductions, createProduction, deleteProduction } from '../../services/ProductionSlice';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(1)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'date', label: 'Date' },
    { id: 'brickType', label: 'Brick Type' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Production() {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const token = localStorage.getItem('token')
    const [records, setRecords] = useState([])
    const dispatch = useDispatch();
    const { loading, data, body, edit, error } = useSelector((state) => ({
        ...state.app,
    }));
    const navigate = useNavigate();
    useEffect(() => {
        var arg = {}
        arg.token = token
        dispatch(getProductions({ arg }));
        if (!token) {
            navigate("/")
        }
        // Runs only on the first render
        setRecords(data)
    }, [records]);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }
    function refreshPage() {
        window.location.reload(false);
    }

    const addOrEdit = async (employee, resetForm) => {
        var arg = {}
        if (!employee._id) {
            arg.body = employee
            arg.token = token
            dispatch(createProduction({ arg }));
            dispatch(getProductions({ token }));
            setRecords(data)
        }
        else {
            arg.body = employee
            arg.token = token
            dispatch(createProduction({ arg }));
            dispatch(getProductions({ token }));
            setRecords(data)
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    const deleteRecords = async (id) => {
        var arg = {}
        arg.id = id
        arg.token = token
        dispatch(deleteProduction({ arg }));
        dispatch(getProductions({ token }));
        setRecords(data)
    }
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(data.length === 0 ? [] : data[0]?.data, headCells, filterFn);

    return (
        <>
            <PageHeader
                subTitle="Daily Production Management"
                title="Production"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />

            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                {loading && <SimpleBackdrop />}
                {loading == false ? <>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item._id}>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => { deleteRecords(item._id) }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                                )
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </> : error}
            </Paper>
            <Popup
                title="Production Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>

        </>
    )
}
