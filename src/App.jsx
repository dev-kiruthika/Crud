import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import useUsers from "./hooks/useUsers";

const App = () => {
  const {
    users,
    editingUser,
    setEditingUser,
    handleSubmit,
    handleDelete,
    loading,
  } = useUsers();

  const [view, setView] = useState("list");

  const switchToForm = (user = null) => {
    setEditingUser(user);
    setView("form");
  };

  const switchToList = () => setView("list");

  const handleFormSubmit = async (values, formikHelpers) => {
    await handleSubmit(values, formikHelpers);
    switchToList();
  };

  return (
    <Box
  sx={{
    px: { xs: 2, sm: 3, md: 6 },
    py: { xs: 2, sm: 3 },
    maxWidth: "xl",
    mx: "auto",
  }}
>
  <ToastContainer />

  {view === "list" ? (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => switchToForm()}
        >
          Create User
        </Button>
      </Box>

      <UserList
        users={users}
        onEdit={switchToForm}
        onDelete={handleDelete}
        loading={loading}
      />
    </>
  ) : (
    <UserForm
      onSubmit={handleFormSubmit}
      userId={editingUser?.id}
      initialValues={editingUser || {}}
    />
  )}
</Box>

  );
};

export default App;
