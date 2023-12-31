import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { db } from './firebase.js';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from 'sweetalert2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Modal from '@mui/material/Modal';
import AddForm from './AddForm.js';
import EditForm from './EditeForm.js';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const empCollectionRef = collection(db, "courses");
    const [open, setOpen] = useState(false);
    const [formid, setFormid] = useState("");
    const [editOpen, setEditOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);
    const handleClose = () => setOpen(false);

    const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.value) {
                deleteApi(id);
            }
        });
    };

    const deleteApi = async (id) => {
        const userDoc = doc(db, "courses", id);
        await deleteDoc(userDoc);
        Swal.fire("Deleted!", "Your course deleted successfully", "success");
        getUsers();
    };

    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            setRows([]);
            getUsers();
        }
    };
    

    const editData = (id, courseName, courseNumber, description, teacherName) => {
        const data = {
            id: id,
            teacherName: teacherName,
            courseName: courseName,
            courseNumber: courseNumber,
            description: description
        };
        setFormid(data);
        handleEditOpen();
    };
    
    

    const updateTable = () => {
        getUsers();
    };

    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddForm handleClose={handleClose} updateTable={updateTable} />
                    </Box>
                </Modal>

                <Modal
                    open={editOpen}
                    onClose={handleEditClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditForm handleClose={handleEditClose} updateTable={updateTable} fid={formid} />
                    </Box>
                </Modal>
            </div>


            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                    sx={{ padding: "20px" }}
                ></Typography>
                <Divider />

                <Box height={10} />
                <Stack direction="row" spacing={2} className='my-2 mb-2'>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={rows}
                        sx={{ width: 300 }}
                        onChange={(e, v) => filterData(v)}
                        getOptionLabel={(rows) => rows.name || ""}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search Courses" />
                        )}
                    />

                    <Typography
                        variant='h6'
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                        Add
                    </Button>
                </Stack>

                <Box height={10} />
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: "100px" }}
                                >
                                    Teacher name
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: "100px" }}
                                >
                                    Course name
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: "100px" }}
                                >
                                    Course number
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: "100px" }}
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: "100px" }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => (
        <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
            <TableCell align="left">
                {row.teacherName}
            </TableCell>
            <TableCell align="left">
                {row.courseName}
            </TableCell>
            <TableCell align="left">
                {row.courseNumber}
            </TableCell>
            <TableCell align="left">
                {row.description}
            </TableCell>
            <TableCell align="left">
                <Stack spacing={2} direction="row">
                    <EditIcon
                        style={{
                            fontSize: '20px',
                            color: 'blue',
                            cursor: 'pointer',
                        }}
                        className='cursor-pointer'
                        onClick={() => { editData(row.id, row.teacherName, row.courseName, row.courseNumber, row.description) }}
                    />

                    <DeleteIcon
                        style={{
                            fontSize: '20px',
                            color: 'darkRed',
                            cursor: 'pointer',
                        }}
                        className='cursor-pointer'
                        onClick={() => deleteUser(row.id)}
                    />
                </Stack>
            </TableCell>
        </TableRow>
    ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </>
    );
}
