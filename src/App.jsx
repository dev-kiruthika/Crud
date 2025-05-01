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
    <Box>
      <ToastContainer />

      {view === "list" ? (
        <Box sx={{ padding: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => switchToForm()}
            sx={{ marginBottom: 2 }}
          >
            Create User
          </Button>

          <UserList
            users={users}
            onEdit={switchToForm}
            onDelete={handleDelete}
            loading={loading}
          />
        </Box>
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
