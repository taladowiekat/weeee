import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Grid, TextField } from '@mui/material';

function Inputs({ type, name, label, onChange, onBlur, value, touched, errors,onClick }) {
    return (
<Grid item xs={12}>
<Field
    type={type}
    name={name}
    as={TextField}
    label={label}
    variant="standard"
    size="small"
    sx={{ minWidth: '100%' }}
    onChange={onChange}
    onBlur={onBlur}
    value={value}
    onClick={onClick}
    error={touched && !!errors}
    helperText={touched && errors}
/>
</Grid>
    );
}

export default Inputs;
