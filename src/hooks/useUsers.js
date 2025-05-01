// Correct hook usage in useUsers
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/users";
import { toast } from "react-toastify";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate should always be called first

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getUsers();
      setUsers(Array.isArray(data) ? data.reverse() : []);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, [fetchUsers]);

  const handleError = (err) => {
    toast.error(err.message || "An error occurred");
  };

  const handleSubmit = useCallback(
    async (values, formikHelpers) => {
      const { resetForm, setSubmitting, setErrors } = formikHelpers;
      setLoading(true);

      try {
        const { email, phone } = values;

        // Check for duplicate email or phone in current users
        const duplicate = users.find(
          (u) =>
            u.id !== editingUser?.id && (u.email === email || u.phone === phone)
        );

        if (duplicate) {
          setErrors({
            email: duplicate.email === email ? "Email already exists" : undefined,
            phone: duplicate.phone === phone ? "Phone number already exists" : undefined,
          });
          toast.error("Duplicate email or phone number found.");
          setSubmitting(false);
          setLoading(false);
          return;
        }

        if (editingUser) {
          await updateUser(editingUser.id, values);
          toast.success("User updated");
          setEditingUser(null);
        } else {
          await createUser(values);
          toast.success("User created");
        }

        await fetchUsers(); // Refresh the user list
        resetForm();
        navigate("/user-list");
      } catch (err) {
        handleError(err);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
    [users, editingUser, fetchUsers, navigate]
  );

  const handleDelete = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await deleteUser(id);
        toast.error("User deleted");
        await fetchUsers();
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [fetchUsers]
  );

  return {
    users,
    editingUser,
    setEditingUser,
    handleSubmit,
    handleDelete,
    loading,
  };
};

export default useUsers;
