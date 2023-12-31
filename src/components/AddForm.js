import React from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { TextField, Button, Typography, IconButton, Box, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, collection } from "firebase/firestore";
import Swal from 'sweetalert2';
import { db } from './firebase.js';
// import * as Yup from 'yup';
import Inputs from './shared/Inputs.jsx';
import { validationSchema } from './validation/valid.js';
function AddForm({ handleClose, updateTable }) {
    
    const formik = useFormik({
        initialValues: {
            teacherName: '',
            courseName: '',
            courseNumber: 0,
            description: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { teacherName, courseName, courseNumber, description } = values;
                const empCollectionRef = collection(db, "courses");
                await addDoc(empCollectionRef, { teacherName, courseName, courseNumber, description: Number(courseNumber) });
                updateTable();
                handleClose();
                Swal.fire('The course added!', 'Your course has been added', 'success');
            } catch (error) {
                console.error("Error submitting form:", error);
                Swal.fire('Error!', 'An error occurred while submitting the form', 'error');
            }
        },
    });
    
    const inputs = [
        {
            type: 'text',
            name: 'teacherName',
            label: 'Teacher Name',
        },
        {
            type: 'text',
            name: 'courseName',
            label: 'Course Name',
        },
        {
            type: 'number',
            name: 'courseNumber',
            label: 'Course Number',
        },
        {
            type: 'text',
            name: 'description',
            label: 'Description',
        },
    ];


    const renderInputs = inputs.map((input, index) => (
        <Inputs
            key={index}
            type={input.type}
            name={input.name}
            label={input.label}
            onChange={formik.handleChange}
            onClick={formik.onClick}
            onBlur={formik.handleBlur}
            value={formik.values[input.name]}
            touched={formik.touched[input.name]}
            errors={formik.errors[input.name]}
            
        />
    ));

    return (
        <Box sx={{ m: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Course
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

export default AddForm;
