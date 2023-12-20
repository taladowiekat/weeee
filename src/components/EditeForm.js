import React from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { TextField, Button, Typography, IconButton, Box, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateDoc, doc, collection } from "firebase/firestore";
import Swal from 'sweetalert2';
import { db } from './firebase.js';
import { validationSchema } from './validation/valid.js';

function EditForm({ handleClose, updateTable, fid }) {
    const formik = useFormik({
        initialValues: {
            teacherName: fid.teacherName,
            courseName: fid.courseName,
            courseNumber: fid.courseNumber,
            description: fid.description,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { teacherName, courseName, courseNumber, description } = values;
                const empCollectionRef = collection(db, "courses");
                const courseDoc = doc(db, 'courses', fid.id);

                await updateDoc(courseDoc, { teacherName, courseName, courseNumber, description: Number(courseNumber) });
                updateTable();
                handleClose();
                Swal.fire('Updated!', 'Your course has been updated', 'success');
            } catch (error) {
                console.error("Error updating form:", error);
                Swal.fire('Error!', 'An error occurred while updating the form', 'error');
            }
        },
    });

    return (
        <Box sx={{ m: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Course
            </Typography>
            <IconButton
                style={{ position: "absolute", top: "0", right: "0" }}
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>

            <Formik {...formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                name="teacherName"
                                label="Teacher Name"
                                variant="standard"
                                size="small"
                                fullWidth
                                {...formik.getFieldProps('teacherName')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                name="courseName"
                                label="Course Name"
                                variant="standard"
                                size="small"
                                fullWidth
                                {...formik.getFieldProps('courseName')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                name="courseNumber"
                                label="Course Number"
                                variant="standard"
                                size="small"
                                fullWidth
                                {...formik.getFieldProps('courseNumber')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                name="description"
                                label="Description"
                                variant="standard"
                                size="small"
                                fullWidth
                                {...formik.getFieldProps('description')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h5' align='right'>
                                <Button type="submit" variant='contained'>
                                    Submit
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Box>
    );
}

export default EditForm;
