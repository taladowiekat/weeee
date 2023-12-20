// EditForm.js

import React from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { TextField, Button, Typography, IconButton, Box, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateDoc, doc, collection } from "firebase/firestore";
import Swal from 'sweetalert2';
import { db } from './firebase.js';
// import * as Yup from 'yup';
import { validationSchema } from './validation/valid.js';

function EditForm({ handleClose, updateTable, fid }) {


    const formik = useFormik({
        initialValues: {
            name: fid.name,
            course: fid.course,
            year: fid.year,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { name, course, year } = values;
                const empCollectionRef = collection(db, "courses");
                const courseDoc = doc(db, 'courses', fid.id);
                await updateDoc(courseDoc, { name, course, year: Number(year) });

                updateTable();
                handleClose();
                Swal.fire('Updated!', 'Your course has been updated', 'success');
            } catch (error) {
                console.error("Error updating form:", error);
                Swal.fire('Error!', 'An error occurred while updating the form', 'error');
            }
        },
    });

    const inputs = [
        {
            type: 'text',
            name: 'name',
            label: 'Name',
        },
        {
            type: 'text',
            name: 'course',
            label: 'Course Name',
        },
        {
            type: 'number',
            name: 'year',
            label: 'Year',
        },
    ];

    const renderInputs = inputs.map((input, index) => (
        <Grid item xs={12} key={index}>
            <Field
                type={input.type}
                name={input.name}
                label={input.label}
                as={TextField}
                variant="standard"
                size="small"
                sx={{ minWidth: '100%' }}
                onChange={formik.handleChange}
                value={formik.values[input.name]}
                onBlur={formik.handleBlur}
                error={formik.touched[input.name] && !!formik.errors[input.name]}
                helperText={formik.touched[input.name] && formik.errors[input.name]}
            />
        </Grid>
    ));

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
                        {renderInputs}
                        <Grid item xs={12}>
                            <Typography variant='h5' align='center'>
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
