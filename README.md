# User Management System

A simple user management system built with React, Material-UI, Formik, Yup, and axios, utilizing **JSON Server** as a mock API. This application allows for the creation, editing, viewing, and deletion of users, with proper form validation and API interactions for managing user data.

## Features

- **Create User**: Allows creating a new user by filling in the form with fields like first name, last name, email, and phone number.
- **Edit User**: Allows editing an existing user by populating the form with the current user data.
- **Delete User**: Users can be deleted from the system with a confirmation dialog.
- **Form Validation**: User input is validated using Formik and Yup, ensuring proper data format.
- **Duplicate Email/Phone Check**: Prevents creating or updating a user if their email or phone number already exists in the system.
- **User List**: Displays a list of users, fetched from the backend API (JSON Server), with options to edit or delete them.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework for building responsive layouts and components.
- **Formik**: A form library for managing form state and validation.
- **Yup**: A schema validation library used for form validation.
- **Axios**: A promise-based HTTP client for making API requests.
- **React-Router**: For routing between different pages of the application.
- **React-Toastify**: For displaying notifications like success or error messages.
- **JSON Server**: A simple and fast way to set up a REST API using a `db.json` file to simulate a backend.

## Setup

### Prerequisites

- **Node.js** and **npm** installed on your local machine (only for running React).
- **JSON Server** (will be used as a mock backend).

### Steps to Set Up the Project

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
