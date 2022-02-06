import React from "react";
import { useSelector } from "react-redux";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ModalButton from "../components/Modal";
import { 
  nameLabel, 
  usernameLabel, 
  cityLabel, 
  emailLabel, 
  editButton, 
  userList,
  modalSubmitButton,
  modalCancelButton, 
  refreshButton, 
  newUserButton, 
  deleteButton,
  deleteModalTitle,
  deleteConfirmationMessage,
  newModalTitle,
  noDataMessage
} from '../locales/en';

const columns = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'name', label: nameLabel, minWidth: 70 },
  {
    id: 'username',
    label: 'Username',
    minWidth: 70,
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 70,
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 70,
  },
  {
    id: 'edit',
    label: 'Edit',
    minWidth: 70,
  },
  {
    id: 'delete',
    label: 'Delete',
    minWidth: 70,
  },
];

const inputStyle = {
  display: 'grid',
  height: 130,
  paddingTop: 2
};

const editStyle = {
  display: 'grid',
  height: '260px',
  paddingTop: '22px'
};

const emptyTableStyles = {
  position: 'relative',
  left: '200%',
  paddingTop: '50px',
  textAlign: 'center'
};


const DashboardTable = () => {
  const [page, setPage] = React.useState(0);
  const users = useSelector((state) => state.allUsers.users);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [usersLocalData, setUsersLocalData] = React.useState(users);
  const [openNewModal, setOpenNewModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState();
  const [formName, setFormName] = React.useState('');
  const [formEmail, setFormEmail] = React.useState('');
  const [formUsername, setFormUsername] = React.useState('');
  const [formCity, setFormCity] = React.useState('');

  const handleClose = () => {
    setOpenEditModal(false);
    setOpenNewModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function appendObjTo(thatArray, newObj) {
    const frozenObj = Object.freeze(newObj);
    return Object.freeze(thatArray.concat(frozenObj));
  }

  const cleanForm = () => {
    setFormName('');
    setFormEmail('');
  }

  const handleCancelButton = () => {
    cleanForm();
    handleClose();
  }

  const isFormValid = formName && formEmail;

  const handleCreateNewUser = (event) => {
    const newUser = {
      "id": parseInt(Math.random() * 1000000),
      "name": formName,
      "username": "",
      "email": formEmail,
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    if (isFormValid) {
      setUsersLocalData(appendObjTo(usersLocalData, newUser))
      handleClose();
      cleanForm();
    }
  };

  const handleDeleteUser = (idToBeExcluded) => {
    setOpenDeleteModal(false);
    const filteredUsersData = usersLocalData.filter(user => {
      return user.id !== idToBeExcluded;
    })

    setUsersLocalData(filteredUsersData);
  };

  const refreshData = () => {
    setUsersLocalData(users);
  };

  const openConfirmDeleteModal = (props) => {
    setSelectedUser(props);
    setOpenDeleteModal(true);
  };

  const editModal = (props) => {
    setOpenEditModal(true);
    setFormCity(props.address.city);
    setFormEmail(props.email);
    setFormName(props.name);
    setFormUsername(props.username);
    setSelectedUser(props);
  };

  const handleEditUser = (selectedUserForEdition) => {
    selectedUserForEdition.name = formName;
    selectedUserForEdition.email = formEmail;
    selectedUserForEdition.username = formUsername;
    selectedUserForEdition.address.city = formCity;

    if (isFormValid) {
      setOpenEditModal(false);
      setFormName('');
      setFormEmail('');
    };
  };

  const handleCancelEdit = (selectedUserForEdition) => {
    const temporaryName = selectedUserForEdition.name;
    const temporaryEmail = selectedUserForEdition.email;
    const temporaryUsername = selectedUserForEdition.username;
    const temporaryCity = selectedUserForEdition.address.city;

    setFormName(temporaryName);
    setFormEmail(temporaryEmail);
    setFormUsername(temporaryUsername);
    setFormCity(temporaryCity);

    setOpenEditModal(false);
  };

  React.useEffect(() => {
    setUsersLocalData(users);
  },[users])
  
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={2}>
                {userList}
              </TableCell>
              <TableCell align="right" colSpan={5}>
                <ModalButton 
                  open={openNewModal}
                  setOpen={setOpenNewModal}
                  buttonName={newUserButton}
                  modalTitle={newModalTitle}
                  buttonStyle='contained'
                >
                  <>
                    <Box sx={inputStyle}>
                      <TextField
                        required
                        id="outlined-required"
                        label={nameLabel}
                        value={formName}
                        onInput={e => setFormName(e.target.value)}
                      />        
                      <TextField
                        required
                        id="outlined-required"
                        label={emailLabel}
                        value={formEmail}
                        onInput={e => setFormEmail(e.target.value)}
                      />
                    </Box>
                    <Button type="submit" onClick={handleCreateNewUser} variant="contained">{modalSubmitButton}</Button>
                    <Button onClick={handleCancelButton} color="error">{modalCancelButton}</Button>
                  </>
                </ModalButton>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersLocalData.length > 0 ? (
              <>
                {usersLocalData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                        <TableCell>
                          {user.id}
                        </TableCell>
                        <TableCell>
                          {user.name}
                        </TableCell>
                        <TableCell>
                          {user.username}
                        </TableCell>
                        <TableCell>
                          {user.email}
                        </TableCell>
                        <TableCell>
                          {user.address.city}
                        </TableCell>
                        <TableCell>
                        <Button onClick={() => {editModal(user)}} variant="contained">{editButton}</Button>
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => {openConfirmDeleteModal(user.id)}} color="error" variant="outlined">{deleteButton}</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
              </>
            ) : (
              <Box style={emptyTableStyles}>
                <Typography>
                  {noDataMessage}
                </Typography>
                <Button onClick={refreshData}>
                  {refreshButton}
                </Button>
              </Box>
            )}
            <ModalButton 
              open={openDeleteModal}
              setOpen={setOpenDeleteModal}
              buttonName={deleteButton}
              modalTitle={deleteModalTitle}
              buttonColor='error'
              buttonStyle='outlined'
              noButton
            >
              <>
                <Typography>
                  {deleteConfirmationMessage}
                </Typography>
                <Button onClick={() => {handleDeleteUser(selectedUser)}} variant="contained">{modalSubmitButton}</Button>
                <Button onClick={() => setOpenDeleteModal(false)} color="error">{modalCancelButton}</Button>
              </>
            </ModalButton>
            {selectedUser && (
              <ModalButton 
                open={openEditModal}
                setOpen={setOpenEditModal}
                buttonName=''
                modalTitle={`Editing '${selectedUser.username}' User`}
                buttonColor='error'
                buttonStyle='outlined'
                noButton
                modalHeight='500px'
              >
                <>
                  <Box sx={editStyle}>
                    <TextField
                      required
                      id="outlined-required"
                      label={nameLabel}
                      value={formName}
                      onInput={e => setFormName(e.target.value)}
                    />        
                    <TextField
                      id="outlined"
                      label={usernameLabel}
                      value={formUsername}
                      onInput={e => setFormUsername(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label={emailLabel}
                      value={formEmail}
                      onInput={e => setFormEmail(e.target.value)}
                    />
                    <TextField
                      id="outlined"
                      label={cityLabel}
                      value={formCity}
                      onInput={e => setFormCity(e.target.value)}
                    />
                  </Box>
                  <Button type="submit" onClick={() => {handleEditUser(selectedUser)}} variant="contained">{modalSubmitButton}</Button>
                  <Button onClick={() => handleCancelEdit(selectedUser)} color="error">{modalCancelButton}</Button>
                </>
              </ModalButton>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={usersLocalData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DashboardTable;