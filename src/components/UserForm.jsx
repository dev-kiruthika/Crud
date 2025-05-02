import React, { useMemo } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import userSchema from "../data/userSchema";
import { useTheme } from "@mui/material/styles";

const UserForm = ({ onSubmit, userId, initialValues = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Default field values
  const defaultValues = useMemo(
    () => Object.fromEntries(userSchema.map(({ name }) => [name, ""])),
    []
  );

  // Memoized validation schema
  const validationSchema = useMemo(() => {
    return Yup.object(
      Object.fromEntries(
        userSchema.map(({ name, label, required, type }) => {
          let fieldValidation = Yup.string();
          if (name === "phone") {
            fieldValidation = fieldValidation.matches(
              /^\d{10}$/,
              "Phone number must be exactly 10 digits"
            );
          }
          if (type === "email") {
            fieldValidation = fieldValidation.matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              "Please enter a valid email address"
            );
          }
          

          if (required) {
            fieldValidation = fieldValidation.required(`${label} is required`);
          }
          return [name, fieldValidation];
        })
      )
    );
  }, []);

  // Formik setup
  const formik = useFormik({
    initialValues: { ...defaultValues, ...(initialValues || {}) },
    validationSchema,
    onSubmit: (values, helpers) => onSubmit(values, helpers),
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: "100%",
        maxWidth: "900px",
        mx: "auto",
        my: 6,
        px: isMobile ? 2 : 4,
        py: 4,
        bgcolor: "#fff",
        borderRadius: 3,
        boxShadow: 3,
        boxSizing: "border-box", // Ensure padding is included in the width
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"} // Adjust heading size for mobile
        align="center"
        fontWeight={600}
        gutterBottom
      >
        {userId ? "Edit User" : "Create User"}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", // Single column on mobile, two columns on desktop
        }}
      >
        {userSchema.map(({ name, label, type }) => (
          <TextField
            key={name}
            fullWidth
            id={name}
            name={name}
            label={label}
            type={type === "email" ? "email" : name === "phone" ? "tel" : "text"}
            value={formik.values[name]}
            onChange={(e) => {
              let val = e.target.value;
              if (name === "phone") {
                val = val.replace(/\D/g, "").slice(0, 10); // numeric only, max 10
              }
              formik.setFieldValue(name, val);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            variant="outlined"
            aria-label={label}
          />
        ))}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ mt: 4, fontWeight: "bold" }}
        disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
      >
        {userId ? "Update User" : "Create User"}
      </Button>
    </Box>
  );
};

export default UserForm;
