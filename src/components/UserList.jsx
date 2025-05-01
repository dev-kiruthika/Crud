import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const UserList = ({ users, onEdit, onDelete, loading }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirmed = () => {
    onDelete(userToDelete);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  if (loading) {
    return <Typography align="center">Loading...</Typography>;
  }

  if (!users?.length) {
    return <Typography align="center">No users found.</Typography>;
  }

  const tableHeaderStyle = { fontWeight: "bold", borderBottom: "2px solid #444" };
  const cellStyle = { borderBottom: "1px solid #444" };
  const ellipsisStyle = { ...cellStyle, maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

  return (
    <>
      <TableContainer sx={{ border: "1px solid #333", borderRadius: "4px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeaderStyle}>First Name</TableCell>
              <TableCell sx={tableHeaderStyle}>Last Name</TableCell>
              <TableCell sx={tableHeaderStyle}>Email</TableCell>
              <TableCell sx={tableHeaderStyle}>Phone</TableCell>
              <TableCell sx={tableHeaderStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={cellStyle}>{user.firstName}</TableCell>
                <TableCell sx={cellStyle}>{user.lastName}</TableCell>
                <TableCell sx={ellipsisStyle}>{user.email}</TableCell>
                <TableCell sx={ellipsisStyle}>{user.phone}</TableCell>
                <TableCell sx={cellStyle}>
                  <IconButton onClick={() => onEdit(user)} sx={{ color: "primary.main" }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => confirmDelete(user.id)} sx={{ color: "error.main" }}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UserList;
