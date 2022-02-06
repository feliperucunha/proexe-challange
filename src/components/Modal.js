import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ModalButton = ({children, ...props}) => {
  const { setOpen } = props;
  const handleOpenModal = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'grid',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: props.modalHeight || 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box id="ModalButton">
      {!props.noButton && (
        <Button onClick={handleOpenModal} color={props.buttonColor} variant={props.buttonStyle}>{props.buttonName}</Button>
      )}

        <Modal
          open={props.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle} component="form">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.modalTitle}
            </Typography>
            {children}
          </Box>
        </Modal>
    </Box>
  );
};
  
export default ModalButton;
  